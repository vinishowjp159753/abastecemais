
import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { maskCPF, maskPhone, maskCEP, randomCode, randomPin } from '../lib/utils';
import { sendOrderEmail } from '../lib/email';

export default function ClientNewOrder({onCreated}){
  const [form,setForm] = useState({
    nome:'', nascimento:'', cpf:'', telefone:'', email:'', cep:'', endereco:'',
    smiles:false, shellbox:false
  });
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [created,setCreated] = useState(null);

  const valid = form.nome && form.cpf.length===14 && form.telefone.length>=14 && form.email.includes('@') && form.cep.length>=8;

  function set(k,v){ 
    setForm(prev=>({...prev, [k]:v})); 
  }

  async function submit(e){
    e.preventDefault();
    if(!valid) return;
    setLoading(true); setError('');
    const code = randomCode();
    const pin = randomPin();
    try {
      await setDoc(doc(db,'orders',code), {
        code, pin,
        nome: form.nome,
        nascimento: form.nascimento || null,
        cpf: form.cpf,
        telefone: form.telefone,
        email: form.email,
        cep: form.cep,
        endereco: form.endereco,
        smiles: !!form.smiles,
        shellbox: !!form.shellbox,
        status: 'Em análise',
        observacao: '',
        custo: 0,
        lucro: 0,
        entregue: false,
        createdAt: serverTimestamp()
      });
      try {
        await sendOrderEmail({
          to_name: form.nome,
          to_email: form.email,
          codigo_pedido: code,
          senha_pedido: pin
        });
      } catch(err){ /* tolerante ao erro de e-mail */ }
      setCreated({code,pin});
      onCreated && onCreated({code,pin,email:form.email});
    } catch(err){
      console.error(err);
      setError('Erro ao salvar seu pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Novo Pedido</h2>
      <form className="grid md:grid-cols-2 gap-4" onSubmit={submit}>
        <div><label className="label">Nome</label><input className="input" value={form.nome} onChange={e=>set('nome', e.target.value)} required/></div>
        <div><label className="label">Data de nascimento</label><input type="date" className="input" value={form.nascimento} onChange={e=>set('nascimento', e.target.value)} /></div>
        <div><label className="label">CPF</label><input className="input" value={form.cpf} onChange={e=>set('cpf', maskCPF(e.target.value))} required/></div>
        <div><label className="label">Telefone</label><input className="input" value={form.telefone} onChange={e=>set('telefone', maskPhone(e.target.value))} required/></div>
        <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={e=>set('email', e.target.value)} required/></div>
        <div><label className="label">CEP</label><input className="input" value={form.cep} onChange={e=>set('cep', maskCEP(e.target.value))} /></div>
        <div className="md:col-span-2"><label className="label">Endereço</label><input className="input" value={form.endereco} onChange={e=>set('endereco', e.target.value)} /></div>
        <div className="flex items-center gap-3"><input type="checkbox" checked={form.smiles} onChange={e=>set('smiles', e.target.checked)}/><span>Possui conta no Smiles?</span></div>
        <div className="flex items-center gap-3"><input type="checkbox" checked={form.shellbox} onChange={e=>set('shellbox', e.target.checked)}/><span>Tem conta no Shell Box?</span></div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={!valid || loading} className="btn btn-primary">{loading ? 'Enviando...' : 'Enviar pedido'}</button>
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </form>

      {created && (
        <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="font-semibold text-green-700">Pedido criado!</p>
          <p className="text-sm text-green-700/90">Código: <b>{created.code}</b> • Senha: <b>{created.pin}</b></p>
          <p className="text-xs text-green-700/80">Esses dados também foram enviados para o e-mail informado.</p>
        </div>
      )}
    </div>
  )
}

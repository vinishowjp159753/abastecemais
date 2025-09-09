
import { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import StatusBadge from './StatusBadge';

export default function ClientTrackOrder(){
  const [code,setCode] = useState('');
  const [pin,setPin] = useState('');
  const [data,setData] = useState(null);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);

  async function consult(e){
    e.preventDefault();
    setLoading(true); setError(''); setData(null);
    try {
      const snap = await getDoc(doc(db,'orders',code.trim()));
      if(!snap.exists()) throw new Error('Pedido não encontrado');
      const v = snap.data();
      if((v.pin||'') !== pin.trim()) throw new Error('Senha incorreta');
      setData(v);
    } catch(err){
      setError(err.message || 'Erro ao consultar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Consultar Pedido</h2>
      <form className="grid md:grid-cols-3 gap-4" onSubmit={consult}>
        <div className="md:col-span-1"><label className="label">Código do pedido</label><input className="input" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="AB-XXXXXX" /></div>
        <div className="md:col-span-1"><label className="label">Senha</label><input className="input" value={pin} onChange={e=>setPin(e.target.value)} placeholder="6 dígitos" /></div>
        <div className="md:col-span-1 flex items-end"><button className="btn btn-primary w-full" disabled={!code || !pin || loading}>{loading ? 'Consultando...' : 'Consultar'}</button></div>
      </form>
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {data && (
        <div className="mt-6 space-y-2">
          <div><span className="label">Status:</span> <StatusBadge value={data.status}/></div>
          {data.observacao && <div><span className="label">Observação:</span> <span>{data.observacao}</span></div>}
          <div className="text-sm text-gray-500">Cliente: {data.nome} • CPF: {data.cpf}</div>
        </div>
      )}
    </div>
  )
}

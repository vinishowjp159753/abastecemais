
import { useEffect, useMemo, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { STATUS } from '../lib/utils';
import StatusBadge from './StatusBadge';

export default function OrdersTable(){
  const [rows,setRows] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(()=>{
    const q = query(collection(db,'orders'), orderBy('createdAt','desc'));
    const unsub = onSnapshot(q, (snap)=>{
      setRows(snap.docs.map(d=>({id:d.id, ...d.data()})));
    });
    return unsub;
  },[]);

  const filtered = useMemo(()=>{
    const s = search.toLowerCase();
    return rows.filter(r => (r.nome||'').toLowerCase().includes(s) || (r.cpf||'').includes(s) || (r.id||'').toLowerCase().includes(s));
  },[rows,search]);

  async function update(id, patch){
    await updateDoc(doc(db,'orders',id), patch);
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pedidos</h3>
        <input className="input max-w-sm" placeholder="Buscar por nome, CPF ou código..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="p-3">Código</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">CPF</th>
              <th className="p-3">Contato</th>
              <th className="p-3">Status</th>
              <th className="p-3">Observação</th>
              <th className="p-3">Custo</th>
              <th className="p-3">Lucro</th>
              <th className="p-3">Entregue</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r=> (
              <tr key={r.id} className="border-t">
                <td className="p-3 font-semibold">{r.id}</td>
                <td className="p-3">{r.nome}</td>
                <td className="p-3">{r.cpf}</td>
                <td className="p-3">{r.telefone}<br/>{r.email}</td>
                <td className="p-3">
                  <select className="input" value={r.status} onChange={e=>update(r.id,{status:e.target.value})}>
                    {STATUS.map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="mt-1"><StatusBadge value={r.status}/></div>
                </td>
                <td className="p-3">
                  <input className="input" value={r.observacao||''} onChange={e=>update(r.id,{observacao:e.target.value})} placeholder="Observação"/>
                </td>
                <td className="p-3">
                  <input className="input" type="number" value={r.custo||0} onChange={e=>update(r.id,{custo: Number(e.target.value)})}/>
                </td>
                <td className="p-3">
                  <input className="input" type="number" value={r.lucro||0} onChange={e=>update(r.id,{lucro: Number(e.target.value)})}/>
                </td>
                <td className="p-3 text-center">
                  <input type="checkbox" checked={!!r.entregue} onChange={e=>update(r.id,{entregue:e.target.checked})} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

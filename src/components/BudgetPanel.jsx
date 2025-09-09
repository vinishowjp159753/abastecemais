
import { useEffect, useMemo, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6EC43F', '#2B7A2E', '#F5A623', '#8884d8', '#82ca9d'];

export default function BudgetPanel(){
  const [rows,setRows] = useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'orders'), (snap)=>{
      setRows(snap.docs.map(d=>({id:d.id, ...d.data()})));
    });
    return unsub;
  },[]);

  const totals = useMemo(()=>{
    const custo = rows.reduce((a,b)=>a+(Number(b.custo)||0),0);
    const lucro = rows.reduce((a,b)=>a+(Number(b.lucro)||0),0);
    const entregues = rows.filter(r=>r.entregue).length;
    const total = rows.length;
    return {custo, lucro, entregues, total};
  },[rows]);

  const barData = [
    {name:'Custos', valor: totals.custo},
    {name:'Lucros', valor: totals.lucro},
  ];
  const pieData = [
    {name:'Entregues', value: totals.entregues},
    {name:'Pendentes', value: Math.max(totals.total - totals.entregues, 0)},
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Resumo Financeiro</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name"/><YAxis/><Tooltip/>
              <Bar dataKey="valor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Entregas</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                {pieData.map((entry, index) => <Cell key={`c-${index}`} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

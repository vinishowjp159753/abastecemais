
import { useState } from 'react';
import logoUrl from '/logo.png';

export default function Header({onNav}){
  const [open,setOpen] = useState(false);
  const link = (id,label)=> (
    <button onClick={()=>{setOpen(false); onNav(id)}} className="text-graphite hover:text-primary transition">
      {label}
    </button>
  );
  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Abastece+" className="h-10 w-auto" />
          <span className="font-display text-xl font-bold text-primary">Abastece+</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {link('home','Início')}
          {link('cliente','Cliente')}
          {link('consultar','Consultar Pedido')}
          {link('admin','Administrador')}
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-3 flex flex-col gap-3">
            {link('home','Início')}
            {link('cliente','Cliente')}
            {link('consultar','Consultar Pedido')}
            {link('admin','Administrador')}
          </div>
        </div>
      )}
    </header>
  )
}

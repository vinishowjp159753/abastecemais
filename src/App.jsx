
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ClientNewOrder from './components/ClientNewOrder'
import ClientTrackOrder from './components/ClientTrackOrder'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'

export default function App(){
  const [route,setRoute] = useState('home')
  const [admin,setAdmin] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNav={(id)=>{ setRoute(id); }}/>
      <main className="flex-1">
        {route==='home' && <Hero onNewOrder={()=>setRoute('cliente')}/>}
        <div className="container my-8 space-y-6">
          {route==='cliente' && <ClientNewOrder onCreated={()=>setRoute('consultar')}/>}
          {route==='consultar' && <ClientTrackOrder/>}
          {route==='admin' && (!admin ? <AdminLogin onLogin={()=>setAdmin(true)} /> : <AdminDashboard />)}
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container py-6 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Abastece+</span>
          <span>Feito com ❤️</span>
        </div>
      </footer>
    </div>
  )
}

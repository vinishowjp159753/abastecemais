
import { useState } from 'react';

export default function AdminLogin({onLogin}){
  const [login,setLogin] = useState('');
  const [senha,setSenha] = useState('');
  const [error,setError] = useState('');

  function submit(e){
    e.preventDefault();
    if(login === 'loginadministrador' && senha === '159753'){
      onLogin(true);
    } else {
      setError('Credenciais inválidas');
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Administrador</h2>
      <form className="space-y-3" onSubmit={submit}>
        <div><label className="label">Login</label><input className="input" value={login} onChange={e=>setLogin(e.target.value)} /></div>
        <div><label className="label">Senha</label><input type="password" className="input" value={senha} onChange={e=>setSenha(e.target.value)} /></div>
        <button className="btn btn-primary w-full">Entrar</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
      <div className="text-sm mt-3">
        Esqueceu a senha? <a className="text-primary hover:underline" href="mailto:vinicius.andrade.123@hotmail.com?subject=Reset%20de%20Senha%20Admin%20-%20Abastece%2B">Clique aqui para resetar</a>
      </div>
    </div>
  )
}

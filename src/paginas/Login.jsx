import { useState } from 'react'
import './Login.css'

function Login({ onLogin, backgroundImage }) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (usuario && contrasena) {
      onLogin(usuario)
      try { if (typeof window !== 'undefined' && window.location) window.location.hash = '#inicio' } catch(e) {}
    }
  }

  const containerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {}

  return (
    <div className="login-container" style={containerStyle}>
      <form onSubmit={handleSubmit} className="login-form">
        <a href="#inicio" className="back-btn" title="Volver al inicio" aria-label="Volver al inicio">
          <svg className="back-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#21313a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="back-label">Volver</span>
        </a>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login

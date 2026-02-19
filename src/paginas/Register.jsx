import React, { useState } from 'react'
import './Login.css'
import './register.css'

export default function Register({ onRegister, backgroundImage }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const containerStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nombre && email && password) {
      if (onRegister) onRegister(nombre)
      try { if (typeof window !== 'undefined' && window.location) window.location.hash = '#inicio' } catch(e) {}
    }
  }

  return (
    <div className="login-container" style={containerStyle}>
      <form className="login-form register-form" onSubmit={handleSubmit}>
        <a href="#inicio" className="back-btn" title="Volver al inicio" aria-label="Volver al inicio">
          <svg className="back-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#21313a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="back-label">Volver</span>
        </a>
        <h1>Registrarse</h1>
        <label>Nombre</label>
        <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-register">Crear cuenta</button>
      </form>
    </div>
  )
}

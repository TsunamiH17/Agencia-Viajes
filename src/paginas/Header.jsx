import { useState } from 'react'
import './Header.css'

function Header({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="header">
      <div className="header-contenido">
        <img src="https://i.pinimg.com/originals/ab/f1/80/abf180964abb052f91529589b8433ce6.png" alt="Avión" className="fotoAvion" />
        
        <div className="logo">
          <h1>MedacViajes</h1>
        </div>

        <div className="right-group">
          <nav className="nav-menu">
            <a href="#inicio" className="nav-link">Inicio</a>
            <a href="#paises" className="nav-link">Países</a>
            <a href="#noticias" className="nav-link">Noticias</a>
          </nav>

          {usuario ? (
            <div className="perfil">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="Perfil" className="foto-perfil" />
              <div className="info-perfil">
                <span className="nombre-usuario">{usuario}</span>
                <button onClick={onLogout} className="btn-logout">Salir</button>
              </div>
            </div>
          ) : (
            <div className="perfil">
              <a href="#login" className="auth-link">Iniciar Sesión</a>
              <a href="#register" className="auth-link">Registrar</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

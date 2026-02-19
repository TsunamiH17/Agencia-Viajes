import { useState } from 'react'
import Login from './paginas/Login'
import './App.css'

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  const handleLogin = (usuario) => {
    setUsuarioLogueado(usuario)
  }

  const handleLogout = () => {
    setUsuarioLogueado(null)
  }

  if (!usuarioLogueado) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>Bienvenido, {usuarioLogueado}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </nav>
      <main className="main-content">
      </main>
    </div>
  )
}

export default App

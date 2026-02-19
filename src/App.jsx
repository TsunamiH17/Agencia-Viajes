import { useState, useEffect } from 'react'
import Login from './paginas/Login'
import Header from './paginas/Header'
import Footer from './paginas/Footer'
import Bloque1 from './componentes/bloque1'
import Bloque2 from './componentes/Bloque2' 
import Bloque3 from './componentes/Bloque3'
import Paises from './paginas/Paises'
import Noticias from './paginas/Noticias'
import Register from './paginas/Register'

import './App.css'

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  const [route, setRoute] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.location ? window.location.hash : ''
    } catch (e) {
      return ''
    }
  })

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '')
    window.addEventListener('hashchange', onHash)
    onHash()
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location && !window.location.hash) {
        window.location.hash = '#inicio'
      }
    } catch (e) {}
  }, [])

  const handleLogin = (usuario) => {
    setUsuarioLogueado(usuario)
  }

  const handleLogout = () => {
    setUsuarioLogueado(null)
    try {
      if (typeof window !== 'undefined' && window.location) {
        window.location.hash = '#inicio'
      }
    } catch (e) {}

    try { setRoute('') } catch (e) {}
  }

  if (route === '#login' || route === '#/login') {
    return <Login onLogin={handleLogin} backgroundImage="/images/fondos/1456.jpg" />
  }

  if (route === '#register' || route === '#/register') {
    return <Register onRegister={handleLogin} backgroundImage="/images/fondos/1460.jpg" />
  }

  if (route === '#/paises' || route === '#paises') {
    return (
      <div className="app-container">
        <Header usuario={usuarioLogueado} onLogout={handleLogout} />
        <main className="main-content">
          <Paises/>
        </main>
        <Footer />
      </div>
    )
  }

  if (
    route === '#/noticias' ||
    route.startsWith('#noticias') ||
    route === '#/noticias' ||
    route.startsWith('#/noticias')
  ) {
    return (
      <div className="app-container">
        <Header usuario={usuarioLogueado} onLogout={handleLogout} />
        <main className="main-content">
          <Noticias />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="app-container">
      <Header usuario={usuarioLogueado} onLogout={handleLogout} />
      <main className="main-content">
        <Bloque1 usuario={usuarioLogueado} onLogout={handleLogout} />
        <Bloque2 usuario={usuarioLogueado} onLogout={handleLogout} />
        <Bloque3 usuario={usuarioLogueado} onLogout={handleLogout} />
      </main>
      <Footer />
    </div>
  )
}

export default App

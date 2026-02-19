import { useEffect, useState } from 'react'
import './noticias.css'
import europaImg from '../assets/europa.svg'

const NOTICIAS_DATA = [
  {
    id: 1,
    titulo: 'Descubriendo los rincones secretos de Málaga',
    autor: 'María López',
    fecha: '2025-11-10',
    lectura: '4 min',
    tags: ['Málaga', 'Cultura', 'Playas'],
    imagen:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60',
    contenido:
      'Un paseo por Málaga revela una ciudad bañada por luz, donde playas doradas coexisten con cafés escondidos y museos llenos de sorpresas. Aquí te proponemos una ruta que combina panoramas, sabores y rincones con encanto.',
    cuerpo: [
      'Desde las callejuelas del centro histórico hasta el vibrante Muelle Uno, Málaga invita a perderse y encontrarse. Cada plaza tiene su historia y cada mirador, su postales.',
      'No te pierdas la Alcazaba al atardecer —la piedra se tiñe de tonos cálidos— y déjate tentar por los espetos junto al mar. Para una dosis de arte, las salas del Museo Picasso ofrecen refugio e inspiración.'
    ]
  },
  {
    id: 2,
    titulo: 'Guía rápida: viajar barato por Europa',
    autor: 'Equipo MedacViajes',
    fecha: '2025-10-02',
    lectura: '6 min',
    tags: ['Europa', 'Ahorro', 'Consejos'],
    // usar asset local para evitar fallos de URL externa
    imagen: europaImg,
    contenido:
      'Viajar por Europa con presupuesto ajustado es una cuestión de astucia y actitud: elegir horarios inteligentes, mezclar transporte y saborear lo local sin derrochar.',
    cuerpo: [
      'Reserva con antelación cuando valga la pena, aprovecha trenes nocturnos para ahorrar una noche de alojamiento y explora opciones flexibles de billetes regionales.',
      'Elige alojamientos con cocina, come en mercados y establecimientos familiares, y aprovecha las apps de descuentos: así mantendrás el viaje auténtico sin inflar la cuenta.'
    ]
  },
  {
    id: 3,
    titulo: 'Tendencias 2026: turismo sostenible',
    autor: 'Carlos Pérez',
    fecha: '2025-12-01',
    lectura: '5 min',
    tags: ['Sostenible', 'Tendencias', 'Medioambiente'],
    imagen:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60',
    contenido:
      'El turismo sostenible no es una tendencia pasajera: es una invitación a viajar con respeto. En este texto recogemos ideas, destinos y prácticas que protegen el entorno y enriquecen la experiencia.',
    cuerpo: [
      'Destinos que priorizan la conservación imponen límites y rutas para proteger su patrimonio natural y cultural; así, la visita se convierte en un gesto responsable.',
      'Apoyar iniciativas locales, elegir alojamientos que cuidan su huella y preferir transporte de baja emisión son pequeños gestos que transforman el turismo.'
    ]
  }
]

function Noticias() {
  const [seleccionada, setSeleccionada] = useState(() => {
    // inicializar seleccionada considerando hash #noticias-<id>
    try {
      const h = window.location.hash || ''
      const m = h.match(/^#noticias-(\d+)$/)
      if (m) {
        const id = Number(m[1])
        const found = NOTICIAS_DATA.find(n => n.id === id)
        if (found) return found
      }
    } catch (e) {}
    return NOTICIAS_DATA[0]
  })
  const [comentarios, setComentarios] = useState([])
  const [texto, setTexto] = useState('')
  const [nombre, setNombre] = useState('')
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [query, setQuery] = useState('')
  const [filterTag, setFilterTag] = useState(null)

  // Carga comentarios desde localStorage por noticia
  useEffect(() => {
    if (!seleccionada) return
    const key = `comentarios_noticia_${seleccionada.id}`
    const saved = localStorage.getItem(key)
    setComentarios(saved ? JSON.parse(saved) : [])
    const likeKey = `likes_noticia_${seleccionada.id}`
    const savedLikes = localStorage.getItem(likeKey)
    setLikes(savedLikes ? Number(savedLikes) : 0)
    const likedKey = `liked_noticia_${seleccionada.id}`
    setLiked(localStorage.getItem(likedKey) === '1')
  }, [seleccionada])

  // reaccionar a cambios manuales en el hash para abrir noticia concreta
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash || ''
      const m = h.match(/^#noticias-(\d+)$/)
      if (m) {
        const id = Number(m[1])
        const found = NOTICIAS_DATA.find(n => n.id === id)
        if (found) setSeleccionada(found)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const handleSeleccion = (nota) => {
    setSeleccionada(nota)
    setTexto('')
  }

  const handleEnviar = (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    const nuevo = {
      id: Date.now(),
      autor: nombre.trim() || 'Anónimo',
      texto: texto.trim(),
      fecha: new Date().toLocaleString()
    }
    const updated = [nuevo, ...comentarios]
    setComentarios(updated)
    localStorage.setItem(
      `comentarios_noticia_${seleccionada.id}`,
      JSON.stringify(updated)
    )
    setTexto('')
    setNombre('')
  }

  const handleBorrar = (id) => {
    const updated = comentarios.filter((c) => c.id !== id)
    setComentarios(updated)
    localStorage.setItem(
      `comentarios_noticia_${seleccionada.id}`,
      JSON.stringify(updated)
    )
  }

  const handleLike = () => {
    const likedKey = `liked_noticia_${seleccionada.id}`
    if (localStorage.getItem(likedKey) === '1') {
      // already liked -> unlike
      const nuevo = Math.max(0, likes - 1)
      setLikes(nuevo)
      localStorage.setItem(`likes_noticia_${seleccionada.id}`, String(nuevo))
      localStorage.removeItem(likedKey)
      setLiked(false)
    } else {
      const nuevo = likes + 1
      setLikes(nuevo)
      localStorage.setItem(`likes_noticia_${seleccionada.id}`, String(nuevo))
      localStorage.setItem(likedKey, '1')
      setLiked(true)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#noticias-${seleccionada.id}`
    try {
      await navigator.clipboard.writeText(url)
      alert('Enlace copiado al portapapeles')
    } catch (e) {
      prompt('Copia este enlace:', url)
    }
  }

  const handleTagFilter = (tag) => {
    setFilterTag(tag === filterTag ? null : tag)
    const match = NOTICIAS_DATA.find(n => n.tags.includes(tag))
    if (match) setSeleccionada(match)
  }

  return (
    <div className="noticias-page">
      <aside className="noticias-list">
        <h2>Últimas noticias</h2>
        <div className="search-filter">
          <input placeholder="Buscar título..." value={query} onChange={e => setQuery(e.target.value)} />
          {filterTag && <div className="active-filter">Filtro: {filterTag} <button onClick={() => setFilterTag(null)}>x</button></div>}
        </div>
        <ul>
          {NOTICIAS_DATA.filter(n => {
            if (filterTag && !n.tags.includes(filterTag)) return false
            if (!query) return true
            return n.titulo.toLowerCase().includes(query.toLowerCase())
          }).map((n) => (
            <li
              key={n.id}
              className={seleccionada?.id === n.id ? 'active' : ''}
              onClick={() => handleSeleccion(n)}
            >
              <img src={n.imagen} alt={n.titulo} />
              <div className="meta">
                <strong>{n.titulo}</strong>
                <span className="fecha">{n.fecha} · {n.lectura}</span>
                <div className="mini-tags">{n.tags.map(t => <span key={t} className="mini-tag" onClick={(e) => { e.stopPropagation(); handleTagFilter(t); }}>{t}</span>)}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <section className="noticia-detail">
        {seleccionada ? (
          <article>
            <h1>{seleccionada.titulo}</h1>
            <div className="meta-line">
              <span className="autor">Por {seleccionada.autor}</span>
              <span className="fecha">{seleccionada.fecha}</span>
              <span className="lectura">{seleccionada.lectura}</span>
            </div>
            <img className="hero" src={seleccionada.imagen} alt={seleccionada.titulo} />
            <p className="contenido">{seleccionada.contenido}</p>
            {seleccionada.cuerpo && seleccionada.cuerpo.map((p, i) => <p key={i}>{p}</p>)}
            <div className="tags">
              {seleccionada.tags?.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div className="action-row">
              <button className="like-button" onClick={handleLike} aria-pressed={liked}>{liked ? '👍 Gracias' : '👍 Me gusta'} ({likes})</button>
              <button className="share-button" onClick={handleShare}>🔗 Compartir</button>
            </div>

            <div className="comentarios">
              <h3>Comentarios ({comentarios.length})</h3>
              <form onSubmit={handleEnviar} className="comentario-form">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre (opcional)"
                />
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  rows={3}
                />
                <button type="submit">Añadir comentario</button>
              </form>

              <ul className="lista-comentarios">
                {comentarios.length === 0 && <li className="vacio">Sé el primero en comentar.</li>}
                {comentarios.map((c) => (
                  <li key={c.id} className="comentario">
                    <div className="cabecera">
                      <strong>{c.autor}</strong>
                      <span className="c-fecha">{c.fecha}</span>
                    </div>
                    <p>{c.texto}</p>
                    <div className="comentario-actions">
                      <button className="borrar-com" onClick={() => handleBorrar(c.id)}>Borrar</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ) : (
          <div>Selecciona una noticia para ver el detalle.</div>
        )}
      </section>
      <aside className="related-section">
        <h4>Artículos relacionados</h4>
        <ul className="related-list">
          {NOTICIAS_DATA.filter((a) => a.id !== seleccionada.id && a.tags.some(t => seleccionada.tags.includes(t))).slice(0,3).map(r => (
            <li key={r.id} onClick={() => handleSeleccion(r)}>
              <img src={r.imagen} alt={r.titulo} />
              <div>
                <strong>{r.titulo}</strong>
                <div className="r-tags">{r.tags.slice(0,2).join(' · ')}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default Noticias

import { useState } from 'react'
import './Paises.css'
import destacados from './paisesData'
import listData from './paisesListData'
import Modal from '../componentes/Modal'

function Paises() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  const openModal = (d) => {
    setModalData(d)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalData(null)
  }

  const [quote, setQuote] = useState({ name: '', email: '', people: 2, notes: '' })
  const [quoteSent, setQuoteSent] = useState(false)

  const handleQuoteChange = (e) => {
    const { name, value } = e.target
    setQuote((prev) => ({ ...prev, [name]: value }))
  }

  const submitQuote = (e) => {
    e.preventDefault()
    const payload = { ...quote, destination: modalData?.name, code: modalData?.code }
    fetch(`${API_BASE}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((r) => {
        if (!r.ok) throw new Error('Error enviando solicitud')
        return r.json()
      })
      .then(() => {
        setQuoteSent(true)
        setTimeout(() => setQuote({ name: '', email: '', people: 2, notes: '' }), 600)
      })
      .catch(() => {
        setQuoteSent(true)
      })
  }

  return (
    <section id="paises" className="paises-section">
      <h2 className="section-title">Países</h2>

      {/* Destinos destacados */}
      <div className="destacados-wrap">
        <h3 className="sub-title">Destinos destacados</h3>
        <div className="destacados-grid">
          {destacados.map((d) => (
            <article key={d.code} className="destino-card">
              <img src={d.image} alt={`Imagen ${d.name}`} className="destino-img" onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}} />
              <div className="destino-body">
                <div className="destino-head">
                  <h4 className="destino-nombre">{d.name}</h4>
                  <span className="badge">{d.avgPrice}</span>
                </div>
                <div className="rating">{'★'.repeat(Math.round(d.rating || 4))} <span className="rating-num">{d.rating}</span></div>
                <p className="destino-desc">{d.description}</p>
                <p className="destino-meta"><strong>Mejor época:</strong> {d.bestTime} — <strong>Desde:</strong> {d.avgPrice}</p>
                <p className="destino-list"><strong>Atractivos:</strong> {d.topAttractions.join(', ')}</p>
                <div className="destino-cta">
                  <button className="btn-primary" onClick={() => openModal(d)}>Ver detalles</button>
                  <button className="btn-outline" onClick={() => openModal(d)}>Ver ofertas</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Listado hardcodeado */}
      <div className="listados-wrap">
        <h3 className="sub-title">Ofertas y paquetes</h3>
        <div className="list-grid">
          {listData.map((item) => (
            <article key={item.id} className="list-card" onClick={() => openModal({ name: item.title, image: item.image, description: item.details, itinerary: [], tips: [], code: item.id })}>
              <img src={item.image} alt={item.title} className="list-img" onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}} />
              <div className="list-body">
                <h4 className="list-title">{item.title}</h4>
                <p className="list-short">{item.short}</p>
                <div className="list-meta">
                  <span className="list-price">{item.price}</span>
                  <span className="list-rating">{'★'.repeat(Math.round(item.rating))} <strong className="rating-num">{item.rating}</strong></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal open={modalOpen} onClose={closeModal} title={modalData?.name}>
        {modalData && (
            <div>
            <img src={modalData.image} alt={modalData.name} style={{ width: '100%', borderRadius: 6, marginBottom: 10 }} onError={(e)=>{e.currentTarget.src='/images/placeholder.svg'}} />
            <p>{modalData.description}</p>
            <p><strong>Itinerario sugerido:</strong></p>
            <ul>
              {modalData.itinerary?.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
            <p><strong>Consejos:</strong></p>
            <ul>
              {modalData.tips?.map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>

            <hr />
            <h4>Solicitar presupuesto</h4>
            {quoteSent ? (
              <div style={{ padding: 10 }}>
                <p>Gracias — hemos recibido tu solicitud. Te contactaremos pronto.</p>
                <button className="btn-primary" onClick={() => setQuoteSent(false)}>Enviar otra solicitud</button>
              </div>
            ) : (
              <form onSubmit={submitQuote} className="quote-form">
                <label>Nombre completo</label>
                <input name="name" value={quote.name} onChange={handleQuoteChange} required />

                <label>Email</label>
                <input name="email" type="email" value={quote.email} onChange={handleQuoteChange} required />

                <label>Personas</label>
                <input name="people" type="number" min="1" value={quote.people} onChange={handleQuoteChange} />

                <label>Notas / Fechas</label>
                <textarea name="notes" value={quote.notes} onChange={handleQuoteChange} rows={3} />

                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button type="submit" className="btn-primary">Enviar solicitud</button>
                  <button type="button" className="btn-outline" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Paises

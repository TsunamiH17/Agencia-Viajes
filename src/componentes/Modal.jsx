import './Modal.css'

function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal

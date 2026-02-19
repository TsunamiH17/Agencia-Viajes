import React from 'react';
import './footer.css';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-contenido">
				<div className="footer-col">
					<p className="dev-text">Desarrollado por DGB, DGG, ASS y HML</p>
				</div>

				<div className="footer-col contact">
					<p className="contact-title">Contacto</p>
					<p className="contact-item">Email: <a href="mailto:medacviajes@gmail.com">medacviajes@gmail.com</a></p>
					<p className="contact-item">Teléfono: <a href="tel:934195077">934195077</a></p>
				</div>
			</div>
		</footer>
	);
}
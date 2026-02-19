import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                {/* Columna Desarrolladores */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-2xl">🌊</span>
                        <h2 className="text-xl font-black tracking-tighter">AGENCIA TSUNAMI</h2>
                    </div>
                    <p className="text-sm font-medium text-slate-500 italic">
                        Desarrollado con ❤️ por <span className="text-blue-400">DGB, DGG, ASS y HML</span>
                    </p>
                    <p className="text-xs text-slate-600">
                        © 2026 Proyecto Educativo - Todos los derechos reservados.
                    </p>
                </div>

                {/* Columna Contacto */}
                <div className="flex flex-col md:items-end space-y-4">
                    <h3 className="text-white font-bold uppercase text-xs tracking-[0.2em]">Contacto</h3>
                    
                    <div className="flex flex-col gap-3 md:items-end">
                        <a 
                            href="mailto:medacviajes@gmail.com" 
                            className="group flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
                        >
                            <span className="text-slate-700 group-hover:text-blue-500 transition-colors">✉️</span>
                            <span className="text-sm">medacviajes@gmail.com</span>
                        </a>
                        
                        <a 
                            href="tel:934195077" 
                            className="group flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
                        >
                            <span className="text-slate-700 group-hover:text-blue-500 transition-colors">📞</span>
                            <span className="text-sm">934 19 50 77</span>
                        </a>
                    </div>
                    
                    {/* Badge de estado de la API (Para el toque visual profesional) */}
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase text-slate-400">Servidor MySQL Online</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
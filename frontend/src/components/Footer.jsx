import { Link } from "react-router-dom"
import { Instagram, MessageCircle } from "lucide-react"
import Logo from "./Logo"

const Footer = () => {

    const actualYear = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white">
            <div className="container-page grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4 xl:py-16">

                <div className="xl:col-span-2">
                    <div className="flex items-center gap-3">
                        <Logo className="size-11" />
                        <span className="text-lg font-bold">Nuno Deportes</span>
                    </div>
                    <p className="mt-4 max-w-xs text-sm text-white/60">
                        Indumentaria deportiva de primera calidad, con atención personalizada.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold">Navegación</h3>
                    <ul className="flex flex-col gap-2.5 text-sm text-white/60">
                        <li><a className="hover:text-white" href="/#inicio">Inicio</a></li>
                        <li><a className="hover:text-white" href="/#nosotros">Nosotros</a></li>
                        <li><a className="hover:text-white" href="/#contacto">Contacto</a></li>
                        <li><Link className="hover:text-white" to="/productos">Productos</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold">Seguinos</h3>
                    <div className="flex gap-2">
                        <a aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink" href="https://www.instagram.com/nd.deportes/" target="_blank" rel="noopener noreferrer">
                            <Instagram size={18} />
                        </a>
                        <a aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white hover:text-ink" href="https://wa.me/543415427021" target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
                    <p>© {actualYear} Nuno Deportes. Todos los derechos reservados.</p>
                    <p>
                        Desarrollado por <a className="font-semibold text-white hover:text-accent" href="https://github.com/santimontironi" target="_blank" rel="noopener noreferrer">Santiago Montironi</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

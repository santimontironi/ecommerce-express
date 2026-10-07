import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ShoppingBag, UserRound } from "lucide-react"
import Logo from "./Logo"

// Rutas absolutas con hash: funcionan tanto desde el home como desde /productos o /checkout
const links = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
]

const Nav = () => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between xl:h-20">

        <a href="/#inicio" className="flex items-center gap-2.5" onClick={close}>
          <Logo className="size-9 xl:size-10" />
          <span className="text-lg font-bold tracking-tight">Nuno Deportes</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="text-sm font-medium text-mute transition-colors hover:text-ink">{label}</a>
          ))}
          <Link to="/productos" className="text-sm font-medium text-mute transition-colors hover:text-ink">Productos</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/admin-login" aria-label="Acceso administrador" className="hidden size-10 place-items-center rounded-full text-mute transition-colors hover:bg-soft hover:text-ink md:grid">
            <UserRound size={19} />
          </Link>
          <Link to="/productos" className="btn btn-dark hidden h-10 px-5 md:inline-flex">
            <ShoppingBag size={16} /> Tienda
          </Link>
          <button
            className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-soft md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {open && (
        <nav className="border-t border-line bg-white md:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={close} className="block rounded-xl px-3 py-3 font-medium hover:bg-soft">{label}</a>
              </li>
            ))}
            <li>
              <Link to="/productos" onClick={close} className="block rounded-xl px-3 py-3 font-medium hover:bg-soft">Productos</Link>
            </li>
            <li className="mt-2 flex gap-2 border-t border-line pt-4">
              <Link to="/productos" onClick={close} className="btn btn-dark flex-1"><ShoppingBag size={16} /> Tienda</Link>
              <Link to="/admin-login" onClick={close} className="btn btn-outline flex-1"><UserRound size={16} /> Admin</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Nav

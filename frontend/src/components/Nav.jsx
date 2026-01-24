import { useState, useEffect } from "react"
import logo from '../img/logo.jpg'
import { Link } from "react-router-dom"

const Nav = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleOpen() {
    setOpen(!open)
  }

  const actualYear = new Date().getFullYear();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'h-[75px] md:h-[85px] bg-linear-to-r from-gray-100 via-slate-100 to-gray-100 shadow-xl border-b border-gray-300/60'
        : 'h-[85px] md:h-[105px] bg-linear-to-r from-gray-50 via-slate-50 to-gray-50 shadow-lg'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl blur-sm opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <img
              className={`relative rounded-2xl shadow-lg ring-2 ring-gray-200/50 transition-all duration-300 ${scrolled ? 'w-[50px]' : 'w-[60px]'
                } group-hover:scale-110 group-hover:ring-blue-400/50`}
              src={logo}
              alt="logo"
            />
          </div>
          <span className="hidden sm:block text-xl font-bold bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-blue-500 group-hover:to-blue-600 transition-all duration-300">
            Nuno Deportes
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <a
            className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/70 hover:shadow-md transition-all duration-300 font-medium relative overflow-hidden group"
            href="#inicio"
          >
            <span className="relative z-10">Inicio</span>
            <span className="absolute inset-0 bg-linear-to-r from-blue-50 to-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
          <a
            className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/70 hover:shadow-md transition-all duration-300 font-medium relative overflow-hidden group"
            href="#sobre-nosotros"
          >
            <span className="relative z-10">Nosotros</span>
            <span className="absolute inset-0 bg-linear-to-r from-blue-50 to-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
          <a
            className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/70 hover:shadow-md transition-all duration-300 font-medium relative overflow-hidden group"
            href="#contacto"
          >
            <span className="relative z-10">Contacto</span>
            <span className="absolute inset-0 bg-linear-to-r from-blue-50 to-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </a>
          <Link
            target="_blank"
            className="px-5 py-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-white/70 hover:shadow-md transition-all duration-300 font-medium relative overflow-hidden group"
            to="/productos"
          >
            <span className="relative z-10">Productos</span>
            <span className="absolute inset-0 bg-linear-to-r from-blue-50 to-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
          <Link
            className="ml-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden group"
            to="/admin-login"
            target="_blank"
          >
            <span className="relative z-10 flex items-center gap-2">
              <i className="bi bi-shield-lock"></i>
              Admin
            </span>
            <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          </Link>
        </nav>

        <button
          className="md:hidden p-2.5 rounded-xl hover:bg-white/70 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={handleOpen}
          aria-label="Menu"
        >
          <i className="bi bi-list text-3xl text-black"></i>
        </button>

        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={handleOpen}
          />
        )}

        <nav
          className={`fixed top-0 right-0 h-full w-[250px] sm:w-[320px] bg-linear-to-br from-gray-900 via-gray-800 to-black shadow-2xl z-50
                    transform transition-transform duration-300 ease-out md:hidden
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >

          <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-900/50">
            <span className="text-lg font-bold text-white">Menú</span>
            <button
              className="p-2 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
              onClick={handleOpen}
            >
              <i className="bi bi-x text-3xl text-white"></i>
            </button>
          </div>

          <ul className="flex flex-col p-5 gap-2">
            <li>
              <Link
                className="block px-5 py-3.5 rounded-xl text-white hover:bg-gray-700/50 hover:shadow-md transition-all duration-300 font-medium"
                to="/"
                onClick={handleOpen}
              >
                <i className="bi bi-house-door mr-3 text-lg"></i>Inicio
              </Link>
            </li>
            <li>
              <Link
                className="block px-5 py-3.5 rounded-xl text-white hover:bg-gray-700/50 hover:shadow-md transition-all duration-300 font-medium"
                to="/nosotros"
                onClick={handleOpen}
              >
                <i className="bi bi-info-circle mr-3 text-lg"></i>Nosotros
              </Link>
            </li>
            <li>
              <Link
                className="block px-5 py-3.5 rounded-xl text-white hover:bg-gray-700/50 hover:shadow-md transition-all duration-300 font-medium"
                to="/contacto"
                onClick={handleOpen}
              >
                <i className="bi bi-envelope mr-3 text-lg"></i>Contacto
              </Link>
            </li>
            <li>
              <Link
                className="block px-5 py-3.5 rounded-xl text-white hover:bg-gray-700/50 hover:shadow-md transition-all duration-300 font-medium"
                to="/productos"
                onClick={handleOpen}
              >
                <i className="bi bi-bag mr-3 text-lg"></i>Productos
              </Link>
            </li>
            <li className="mt-4">
              <Link
                className="block px-5 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl"
                to="/admin-login"
                onClick={handleOpen}
              >
                <i className="bi bi-shield-lock mr-2"></i>Administrador
              </Link>
            </li>
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50 bg-gray-900/30">
            <p className="text-xs text-gray-400 text-center">© {actualYear} Tu Tienda</p>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Nav
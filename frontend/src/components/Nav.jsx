import { useState } from "react"
import { Link } from "react-router-dom"

const Nav = () => {

  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(!open)
  }

  return (

    <>
      <button className="text-black text-3xl md:hidden mb-4 mt-7 ml-7" onClick={handleOpen}>
        <i className="bi bi-list"></i>
      </button>

      <header className={` ${open ? "transform transition duration-500 ease-in-out translate-x-0 shadow-[10px_5px_10px_rgba(0,0,0,0.8)]" : " transform transition duration-500 ease-in-out -translate-x-full"} fixed top-0 left-0 h-screen w-[140px] bg-linear-to-b from-black to-blue-950 flex flex-col items-center py-10 md:translate-x-0 md:w-full md:h-[100px] md:flex-row md:justify-between md:p-[40px] md:py-0`}>

        <button className="text-white text-3xl md:hidden mb-4" onClick={handleOpen}>
          <i className="bi bi-x"></i>
        </button>

        <Link to="/">
          <h1 className="text-white text-center">Logo</h1>
        </Link>

        <nav className="flex-1 flex flex-col justify-center md:flex-0">
          <ul className="text-white flex flex-col items-center gap-[20px] md:flex-row">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/ingreoAdmin">Administrador</Link></li>
          </ul>
        </nav>

      </header>
    </>



  )
}

export default Nav
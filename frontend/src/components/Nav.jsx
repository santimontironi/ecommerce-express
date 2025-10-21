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

      <header className={` ${open ? "transform transition duration-500 ease-in-out translate-x-0" : "transform transition duration-500 ease-in-out -translate-x-full"} fixed top-0 left-0 h-screen w-[140px] bg-linear-to-b from-black to-blue-950 flex flex-col items-center py-10`}>

        <button className="text-white text-3xl md:hidden mb-4" onClick={handleOpen}>
          <i className="bi bi-x"></i>
        </button>

        <Link to="/">
          <h1 className="text-white text-center">Logo</h1>
        </Link>

        <nav className="flex-1 flex flex-col justify-center">
          <ul className="text-white flex flex-col items-center gap-[20px]">
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
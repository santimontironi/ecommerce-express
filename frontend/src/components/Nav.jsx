import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '../img/logo.jpg'

const Nav = () => {

  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(!open)
  }

  return (

    <header className="fixed top-0 left-0 w-full h-[100px] md:h-[120px] bg-linear-to-b from-white to-[#707070] flex items-center justify-between p-15">

      <Link to="/">
        <img className="w-[70px] rounded-2xl" src={logo} alt="logo" />
      </Link>

      <button className="text-black text-3xl md:hidden" onClick={handleOpen}>
        <i className="bi bi-list"></i>
      </button>

      <nav className={`fixed top-0 right-0 h-screen w-[140px] flex flex-col items-center py-10 
                    transform transition-transform duration-500 ease-in-out
                    ${open ? "translate-x-0 navOpen" : "translate-x-full"}
                    md:static md:flex md:flex-row md:h-auto md:w-auto md:translate-x-0 md:py-0`}>
        <ul className="flex flex-col items-center justify-center gap-5 absolute top-[30%] xl:static md:flex-row md:gap-8 text-white xl:text-black font-bold">
          <button className="text-white xl:text-black text-3xl md:hidden" onClick={handleOpen}>
            <i className="bi bi-x"></i>
          </button>
          <li><Link className="no-underline" to="/">Inicio</Link></li>
          <li><Link className="no-underline" to="/nosotros">Nosotros</Link></li>
          <li><Link className="no-underline" to="/contacto">Contacto</Link></li>
          <li><Link className="no-underline" target="_blank" to="/productos">Productos</Link></li>
          <li><Link className="no-underline bg-white text-black p-3 rounded-xl hover:bg-black hover:text-white" to="/admin-login">Administrador</Link></li>
        </ul>
      </nav>

    </header>



  )
}

export default Nav
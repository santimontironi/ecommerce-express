import logo from "../img/logo.jpg";
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink } from "react-router-dom"

const Footer = () => {

    const actualYear = new Date().getFullYear();

    return (
        <footer className="w-full h-[850px] xl:h-[450px] 2xl:h-[400px] flex flex-col justify-center items-center">

            <div className="w-[60%] flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-0">
                <img className="w-[150px] rounded-2xl" src={logo} alt="Logo" />
                <div className="flex flex-col gap-5 items-center">
                    <h3 className="text-white text-2xl font-bold pb-3 border-b-2 border-blue-500">Enlaces rápidos</h3>
                    <ul>
                        <li><ScrollLink className="no-underline hvr-bounce-to-right p-2 cursor-pointer text-white font-extralight" to="home" smooth={true} duration={500} offset={-70}>Inicio</ScrollLink></li>
                        <li><ScrollLink className="no-underline hvr-bounce-to-right p-2 cursor-pointer text-white font-extralight" to="aboutus" smooth={true} duration={500} offset={-70}>Nosotros</ScrollLink></li>
                        <li><ScrollLink className="no-underline hvr-bounce-to-right p-2 cursor-pointer text-white font-extralight" to="contact" smooth={true} duration={500} offset={-70}>Contacto</ScrollLink></li>
                        <li><RouterLink className="no-underline hvr-bounce-to-right p-2 text-white font-extralight" target="_blank" to="/productos">Productos</RouterLink></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <h3 className="text-white text-2xl font-bold pb-3 border-b-2 border-blue-500">Redes Sociales</h3>
                    <ul>
                        <li><a href="https://www.instagram.com/nd.deportes/" target="_blank"><img src="https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000" alt="logo-instagram" /></a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center mt-5">
                <p className="text-white text-center pt-5">© {actualYear} Nuno Deportes. Todos los derechos reservados.</p>

                <span className="text-white text-center font-extralight text-sm">Sitio web desarrollado por <a className="text-blue-500 font-bold" href="https://github.com/santimontironi" target="_blank">Santiago Montironi</a></span>

            </div>

        </footer>
    )
}

export default Footer
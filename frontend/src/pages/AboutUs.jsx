import { Link } from "react-router-dom"
import logo from '../img/logo.jpg'

const AboutUs = () => {
    return (
        <div className="w-full h-auto pb-10 border-t border-[#ececec] containerAboutUs">
            <div className="flex flex-col md:flex-row gap-8 xl:w-[1000px] justify-center items-center mx-auto mt-10">
                <div className="flex flex-col gap-3 text-white">
                    <h2 className="text-[32px] xl:text-[45px] font-extrabold border-b-2 border-[#ececec] md:[450px]">Sobre nosotros</h2>
                    <p className="w-[320px] xl:w-[850px] font-light text-[#ececec] mx-auto">En Nuno Deportes, creemos que el deporte y el estilo van de la mano. Nos especializamos en crear ropa deportiva a medida, diseñada para adaptarse perfectamente a tu cuerpo, tu rendimiento y tu personalidad. Cada prenda que confeccionamos combina calidad, comodidad y diseño exclusivo, utilizando materiales de alta tecnología que ofrecen resistencia, elasticidad y transpirabilidad. Ya seas un atleta profesional, un amante del gimnasio o simplemente alguien que busca sentirse bien mientras entrena, tenemos la prenda ideal para vos. Nuestro objetivo es acompañarte en cada movimiento, con ropa que te inspire a superarte día a día. Porque no hay nada más auténtico que vestirte con algo hecho especialmente para vos.</p>
                    <Link to={"/productos"} className="bg-blue-600 text-white font-medium text-base sm:text-lg p-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform duration-200 cursor-pointer w-[250px] text-center mx-auto">Ver nuestros productos</Link>
                </div>
                <img className="w-[270px] rounded-2xl md:w-[350px] xl:[500px]" src={logo} alt="" />
            </div>
        </div>
    )
}

export default AboutUs
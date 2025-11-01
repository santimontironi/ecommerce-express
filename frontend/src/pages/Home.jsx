import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full h-screen containerHome flex flex-col items-center justify-center text-center text-white gap-4 mt-7" >
      <img src={logo} alt="Logo" className="w-40 mb-6 rounded-2xl shadow-[10px_15px_10px_rgba(0,0,0,0.8)]" />
      <h1 className="text-4xl font-bold mb-4 text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)]">
        Bienvenidos a Nuno Deportes
      </h1>
      <p className="text-[17px] w-[80%] xl:w-[1000px] text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)]">
        En <strong>Nuno Deportes</strong> encontrarás todo lo que necesitás para rendir al máximo: 
        indumentaria deportiva de primera calidad. Trabajamos con atención personalizada para que elijas el producto 
        perfecto según tus objetivos. ¡Equipate con nosotros y llevá tu entrenamiento al siguiente nivel!
      </p>
      <div className='flex flex-col md:flex-row gap-5 items-center justify-center'>
        <Link to={"/productos"} className="bg-blue-800 text-white font-medium text-base sm:text-lg py-3 px-8 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform duration-200 cursor-pointer">Ver nuestros productos</Link>
      </div>

      <a href='https://wa.me/543415427021' target='_blank' className='fixed right-10 bottom-10 border-none bg-transparent decoration-0 cursor-pointer btnWhatsapp z-50'>
        <img className='w-[70px]' src="https://img.icons8.com/?size=100&id=QkXeKixybttw&format=png&color=000000" alt="btn-whatsapp" />
      </a>
    </div>
  )
}

export default Home
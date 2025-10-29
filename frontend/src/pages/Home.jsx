import logo from '../img/logo.jpg'

const Home = () => {
  return (
    <div className="w-full h-screen containerHome flex flex-col items-center justify-center text-center text-white gap-4">
      <img src={logo} alt="Logo" className="w-40 mb-6 rounded-2xl shadow-[10px_15px_10px_rgba(0,0,0,0.8)]" />
      <h1 className="text-4xl font-bold mb-4 text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)]">
        Bienvenidos a Nuno Deportes
      </h1>
      <p className="text-[17px] w-[80%] xl:w-[1000px] text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)]">
        En <strong>Nuno Deportes</strong> encontrarás todo lo que necesitás para rendir al máximo: 
        indumentaria deportiva de primera calidad. Trabajamos con atención personalizada para que elijas el producto 
        perfecto según tus objetivos. ¡Equipate con nosotros y llevá tu entrenamiento al siguiente nivel!
      </p>
    </div>
  )
}

export default Home
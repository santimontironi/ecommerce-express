import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-black">

      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
      </div>

      {/* Formas decorativas oscuras */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-black to-gray-900 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 sm:pt-44 lg:pt-48 pb-20">

        <div className="max-w-5xl mx-auto text-center">

          {/* Logo */}
          <div className="mb-12">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-3xl blur-xl opacity-50"></div>
              <img
                src={logo}
                alt="Logo Nuno Deportes"
                className="relative w-36 sm:w-44 lg:w-52 mx-auto rounded-3xl shadow-2xl hover:shadow-gray-500/50 hover:scale-105 transition-all duration-500 border-2 border-gray-600/50"
              />
            </div>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-8 tracking-tight">
            NUNO DEPORTES
          </h1>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-gray-500"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent via-gray-500 to-gray-500"></div>
          </div>

          {/* Descripción */}
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed mb-6">
              Indumentaria Deportiva de Primera Calidad
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Encontrá todo lo que necesitás para rendir al máximo. Atención personalizada
              para elegir el producto perfecto según tus objetivos.
            </p>
          </div>

          {/* Características */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-16">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-gray-500/50 group-hover:scale-110 transition-all duration-300">
                <i className="bi bi-trophy text-2xl text-gray-300"></i>
              </div>
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Calidad Premium</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-gray-500/50 group-hover:scale-110 transition-all duration-300">
                <i className="bi bi-person-check text-2xl text-gray-200"></i>
              </div>
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Atención Personal</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-gray-500/50 group-hover:scale-110 transition-all duration-300">
                <i className="bi bi-lightning-charge text-2xl text-gray-300"></i>
              </div>
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Rendimiento</span>
            </div>
          </div>

        </div>
      </div>

      {/* Botón WhatsApp flotante */}
      <a
        href="https://wa.me/543415427021"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-20 bottom-6 md:right-10 sm:bottom-8 z-50 group"
      >
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full shadow-2xl hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-300">
          <i className="bi bi-whatsapp text-white text-3xl sm:text-4xl"></i>
        </div>
      </a>
    </section>
  )
}

export default Home
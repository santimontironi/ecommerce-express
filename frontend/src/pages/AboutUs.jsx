import { Link } from "react-router-dom"

const AboutUs = () => {
    return (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 py-24">

            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}>
            </div>

            {/* Formas decorativas */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gray-600 to-black rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Título principal */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                        Sobre Nosotros
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-gray-500"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-20 h-[1px] bg-gradient-to-l from-transparent via-gray-500 to-gray-500"></div>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-400 mt-6 max-w-3xl mx-auto">
                        Pasión por el deporte, compromiso con la calidad
                    </p>
                </div>

                {/* Contenido principal en cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Card: Nuestra Historia */}
                    <div className="p-8 sm:p-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="bi bi-star text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white">Nuestra Historia</h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                            En <span className="font-bold text-white">Nuno Deportes</span> creemos que el deporte y el estilo van de la mano. Desde nuestros inicios, nos especializamos en crear ropa deportiva que no solo se adapta perfectamente a tu cuerpo, sino que también refleja tu personalidad única.
                        </p>
                    </div>

                    {/* Card: Nuestra Misión */}
                    <div className="p-8 sm:p-10 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                                <i className="bi bi-bullseye text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-black">Nuestra Misión</h3>
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Acompañarte en cada movimiento con ropa que te inspire a superarte día a día. Porque no hay nada más auténtico que vestirte con algo hecho especialmente para vos.
                        </p>
                    </div>

                </div>

                {/* Card grande: Qué nos hace diferentes */}
                <div className="p-10 sm:p-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <i className="bi bi-gem text-3xl text-white"></i>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white">¿Qué nos hace diferentes?</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                <i className="bi bi-check-circle-fill text-green-400"></i>
                                Calidad Superior
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Utilizamos materiales de alta tecnología que ofrecen resistencia, elasticidad y transpirabilidad excepcionales.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                <i className="bi bi-check-circle-fill text-green-400"></i>
                                Diseño Exclusivo
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Cada prenda combina comodidad y estilo, diseñada para adaptarse perfectamente a tu rendimiento.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                <i className="bi bi-check-circle-fill text-green-400"></i>
                                Personalización
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Confeccionamos prendas a medida que se ajustan a tu cuerpo y necesidades específicas.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-200 mb-3 flex items-center gap-2">
                                <i className="bi bi-check-circle-fill text-green-400"></i>
                                Atención Personalizada
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Te asesoramos en cada paso para que encuentres la prenda perfecta para tus objetivos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats / Características */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">

                    <div className="p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <i className="bi bi-trophy text-3xl text-gray-300"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Calidad Premium</h3>
                        <p className="text-sm text-gray-400">Materiales de alta tecnología y confección de primera línea</p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-white to-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <i className="bi bi-clock text-3xl text-white"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2">Atención 24/7</h3>
                        <p className="text-sm text-gray-700">Estamos disponibles cuando nos necesites</p>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <i className="bi bi-scissors text-3xl text-gray-300"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Diseño a Medida</h3>
                        <p className="text-sm text-gray-400">Prendas personalizadas para tu cuerpo y estilo</p>
                    </div>

                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/productos"
                        className="inline-flex items-center gap-3 group px-10 py-5 bg-gradient-to-r from-white to-gray-200 text-black font-bold text-base sm:text-lg uppercase tracking-wide rounded-xl hover:from-gray-100 hover:to-gray-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Ver Nuestros Productos
                        <i className="bi bi-arrow-right text-xl group-hover:translate-x-2 transition-transform"></i>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default AboutUs
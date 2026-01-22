import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import Loader from "../components/Loader";

const Contact = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState('')

  const [messageSent, setMessageSent] = useState('');

  const { sendMessage, messageLoading } = useContext(AdminContext);

  const onSubmit = async (data) => {
    try {
      const res = await sendMessage(data);
      setMessageSent(res.message);
      reset()
      setErrorMessage('');
    }
    catch (error) {
      setErrorMessage(error.response?.data?.message)
    }
  };


  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex justify-center items-center py-24">

      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
      </div>

      {/* Formas decorativas */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gray-600 to-black rounded-full blur-3xl opacity-30"></div>

      {messageLoading ? <Loader /> : (
        <div className="relative z-10 w-[90%] max-w-[700px] px-4">

          {/* Título principal */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
              Contactanos
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-gray-500"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent via-gray-500 to-gray-500"></div>
            </div>
            <p className="text-base sm:text-lg text-gray-400 mt-6">
              Estamos aquí para ayudarte. Envianos tu consulta.
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-8 sm:p-10">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <i className="bi bi-person text-lg"></i>
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  className={`p-4 rounded-xl bg-gray-700/50 text-white border ${errors.name ? 'border-red-500' : 'border-gray-600/50'
                    } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <i className="bi bi-exclamation-circle"></i>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <i className="bi bi-envelope text-lg"></i>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  className={`p-4 rounded-xl bg-gray-700/50 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600/50'
                    } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Ingrese un correo válido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <i className="bi bi-exclamation-circle"></i>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <i className="bi bi-chat-text text-lg"></i>
                  Mensaje
                </label>
                <textarea
                  rows="6"
                  name="message"
                  placeholder="Escribí tu mensaje aquí..."
                  className={`p-4 rounded-xl bg-gray-700/50 text-white border ${errors.message ? 'border-red-500' : 'border-gray-600/50'
                    } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300 resize-none`}
                  {...register("message", {
                    required: "El mensaje es obligatorio",
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <i className="bi bi-exclamation-circle"></i>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={messageLoading}
                className="group px-8 py-4 bg-gradient-to-r from-white to-gray-200 text-black font-bold text-base sm:text-lg uppercase tracking-wide rounded-xl hover:from-gray-100 hover:to-gray-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-3">
                  Enviar Mensaje
                  <i className="bi bi-send text-lg group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
            </form>

            {messageSent && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                <p className="text-green-400 font-semibold text-center flex items-center justify-center gap-2">
                  <i className="bi bi-check-circle-fill text-xl"></i>
                  {messageSent}
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-red-400 font-semibold text-center flex items-center justify-center gap-2">
                  <i className="bi bi-exclamation-triangle-fill text-xl"></i>
                  {errorMessage}
                </p>
              </div>
            )}
          </div>

          {/* Info adicional */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl text-center">
              <i className="bi bi-whatsapp text-3xl text-gray-300 mb-2"></i>
              <p className="text-sm text-gray-400 font-medium">WhatsApp</p>
              <p className="text-xs text-gray-500 mt-1">Respuesta inmediata</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl text-center">
              <i className="bi bi-envelope text-3xl text-gray-300 mb-2"></i>
              <p className="text-sm text-gray-400 font-medium">Email</p>
              <p className="text-xs text-gray-500 mt-1">24/7 disponible</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl text-center">
              <i className="bi bi-clock text-3xl text-gray-300 mb-2"></i>
              <p className="text-sm text-gray-400 font-medium">Horario</p>
              <p className="text-xs text-gray-500 mt-1">Lun - Sáb 9-20hs</p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};

export default Contact;
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";
import Loader from "../components/Loader";

const Contact = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [errormessage, setErrorMessage] = useState('')

  const { sendMessage, messageLoading } = useContext(AdminContext);

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      setErrorMessage('')
    }
    catch (error) {
      setTimeout(() => {
        setErrorMessage(error.response?.data?.message || 'Error al enviar mensaje')
      }, 1500)
    }
  };


  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center py-16 containerContact border-t border-[#ececec]">
      {messageLoading && <Loader />}
      <div className="w-[90%] max-w-[700px] bg-[#2a2a2a] text-white rounded-2xl shadow-2xl p-10 border border-[#101010]">
        <h2 className="text-center text-[32px] font-extrabold mb-8 border-b-2 border-blue-600 pb-2">
          Contactanos
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              className={`p-3 rounded-lg bg-[#3b3b3b] text-white border ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:border-blue-500`}
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              className={`p-3 rounded-lg bg-[#3b3b3b] text-white border ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:border-blue-500`}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingrese un correo válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Mensaje</label>
            <textarea
              rows="5"
              name="message"
              placeholder="Escribí tu mensaje..."
              className={`p-3 rounded-lg bg-[#3b3b3b] text-white border ${
                errors.message ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:border-blue-500 resize-none`}
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={messageLoading}
            className="bg-blue-800 hover:bg-blue-600 active:scale-95 transition-all duration-500 text-white font-semibold py-3 rounded-lg mt-4 cursor-pointer"
          >
            Enviar
          </button>
        </form>

        {errormessage && (
          <p className="text-red-600 font-bold text-center mt-4">{errormessage}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
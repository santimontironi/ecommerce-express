const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center py-16 containerContact border-t border-[#ececec]">
      <div className="w-[90%] max-w-[700px] bg-[#2a2a2a] text-white rounded-2xl shadow-2xl p-10 border border-[#101010]">
        <h2 className="text-center text-[32px] font-extrabold mb-8 border-b-2 border-blue-600 pb-2">
          Contactanos
        </h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="p-3 rounded-lg bg-[#3b3b3b] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="p-3 rounded-lg bg-[#3b3b3b] text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-2">Mensaje</label>
            <textarea
              rows="5"
              placeholder="Escribí tu mensaje..."
              className="p-3 rounded-lg bg-[#3b3b3b] text-white border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-600 active:scale-95 transition-all duration-500 text-white font-semibold py-3 rounded-lg mt-4 cursor-pointer"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
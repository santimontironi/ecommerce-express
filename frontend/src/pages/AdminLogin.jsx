import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [errorLogin, setErrorLogin] = useState('')

  const { signInAdmin, loading, admin } = useContext(AdminContext);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await signInAdmin(data);
      setErrorLogin('')
    }
    catch (error) {
      setTimeout(() => {
        setErrorLogin(error.response?.data?.message || 'Error al iniciar sesión')
      },1500)
    }
  };

  useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  return (
    <div className="containerAdminLogin h-screen flex flex-col items-center justify-center px-4">

      {loading ? <Loader /> :
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#dbd8d8] shadow-[8px_8px_10px_rgba(0,0,0,0.8)] w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[800px] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-black">
            Ingreso de Administrador
          </h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-black font-medium">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "El usuario es obligatorio" })}
              className="border border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Ingresá tu usuario"
            />
            {errors.username && (
              <span className="text-red-600 text-sm font-bold">{errors.username.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black font-medium">
              Clave
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "La clave es obligatoria" })}
              className="border border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Ingresá tu clave"
            />
            {errors.password && (
              <span className="text-red-600 text-sm font-bold">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-black text-white py-2 rounded-lg text-lg hover:bg-white hover:text-black border border-black transition-all duration-300 cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      }

      {errorLogin && <p className="text-white text-xl rounded-xl bg-red-600 p-2.5 font-bold mt-[30px]">{errorLogin}</p>}
    </div>
  );
};

export default AdminLogin;
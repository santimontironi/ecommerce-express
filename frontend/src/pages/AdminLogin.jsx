import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin"
import GoBack from "../components/GoBack";
import Logo from "../components/Logo";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [errorLogin, setErrorLogin] = useState('')

  const { signInAdmin, loginLoading , admin } = useAdmin();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await signInAdmin(data);
      setErrorLogin('')
    }
    catch (error) {
      setTimeout(() => {
        setErrorLogin(error.response?.data?.message || 'Error al iniciar sesión')
      },1500)
    }
  };

  useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-soft px-4 py-6 md:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-32 -left-24 size-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-24 -bottom-32 size-96 rounded-full bg-indigo-400/25 blur-3xl" />
      </div>

      <GoBack url="/" className="self-start" />

      <div className="my-auto w-full max-w-md self-center py-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card relative flex flex-col gap-5 overflow-hidden bg-white/85 p-6 shadow-xl shadow-ink/5 backdrop-blur md:p-10">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-indigo-500 to-accent" />
          <div className="text-center">
            <Logo className="mx-auto size-14" />
            <h1 className="mt-5 text-2xl font-bold tracking-tight">Ingreso de administrador</h1>
            <p className="mt-1 text-sm text-mute">Accedé al panel para gestionar la tienda.</p>
          </div>

          <div>
            <label htmlFor="username" className="field-label">Usuario</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", { required: "El usuario es obligatorio" })}
              className="field"
              placeholder="Ingresá tu usuario"
            />
            {errors.username && <span className="field-error">{errors.username.message}</span>}
          </div>

          <div>
            <label htmlFor="password" className="field-label">Clave</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", { required: "La clave es obligatoria" })}
              className="field"
              placeholder="Ingresá tu clave"
            />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          <button type="submit" disabled={loginLoading} className="btn btn-dark mt-1 w-full">
            {loginLoading ? "Ingresando…" : "Ingresar"}
          </button>

          {errorLogin && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-600">{errorLogin}</p>}
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../context/adminContext"
import Loader from "./Loader";

const SecurityRoutes = ({ children }) => {

  const { admin, loading } = useContext(AdminContext)

  // Si todavía está verificando, no redirigir
  if (loading) {
    return <Loader />
  }

  // Una vez que terminó de verificar, si no hay administrador, redirigir al login
  if (!admin) {
    return <Navigate to="/admin-login" />
  }

  // Si hay administrador, mostrar el contenido
  return (
    children
  )
}

export default SecurityRoutes
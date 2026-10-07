import { Link } from "react-router-dom"
import Logo from "./Logo"

// Pantalla común para los retornos de Mercado Pago (éxito, pendiente, error)
const StatusPage = ({ icon: Icon, tone, title, children }) => {
    return (
        <main className="grid min-h-svh place-items-center bg-soft px-4 py-10">
            <div className="card w-full max-w-lg p-8 text-center md:p-12">
                <Link to="/" className="inline-block"><Logo className="mx-auto size-12" /></Link>

                <span className={`mx-auto mt-8 grid size-16 place-items-center rounded-full ${tone}`}>
                    <Icon size={30} strokeWidth={1.75} />
                </span>

                <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                <div className="mt-3 flex flex-col gap-3 text-mute">{children}</div>

                <div className="mt-8 flex flex-col justify-center gap-3 md:flex-row">
                    <Link to="/productos" className="btn btn-dark">Volver a la tienda</Link>
                    <Link to="/" className="btn btn-outline">Ir al inicio</Link>
                </div>
            </div>
        </main>
    )
}

export default StatusPage

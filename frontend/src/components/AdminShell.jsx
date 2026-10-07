import { NavLink, Link, useNavigate } from "react-router-dom"
import { LayoutGrid, Package, Plus, Store, LogOut } from "lucide-react"
import { useAdmin } from "../hooks/useAdmin"
import Logo from "./Logo"

const items = [
    { to: "/admin", label: "Panel", icon: LayoutGrid },
    { to: "/admin-productos", label: "Productos", icon: Package },
    { to: "/agregar-producto", label: "Agregar", icon: Plus },
]

const itemClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-ink text-white" : "text-mute hover:bg-soft hover:text-ink"}`

// Estructura común del dashboard: barra lateral en xl, barra superior en mobile/tablet
const AdminShell = ({ title, subtitle, actions, children }) => {

    const { admin, logoutAdmin } = useAdmin()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutAdmin()
        } finally {
            navigate("/")
        }
    }

    return (
        <div className="min-h-svh bg-soft xl:grid xl:grid-cols-[256px_1fr]">

            <aside className="sticky top-0 z-30 border-b border-line bg-white xl:flex xl:h-svh xl:flex-col xl:border-r xl:border-b-0 xl:p-5">
                <div className="flex items-center justify-between px-4 py-3 md:px-8 xl:mb-8 xl:p-1">
                    <Link to="/admin" className="flex items-center gap-2.5">
                        <Logo className="size-9" />
                        <span className="leading-tight">
                            <span className="block font-bold">Nuno Deportes</span>
                            <span className="block text-xs text-mute">Administración</span>
                        </span>
                    </Link>
                    <button onClick={handleLogout} aria-label="Cerrar sesión" className="grid size-10 cursor-pointer place-items-center rounded-full text-mute hover:bg-soft hover:text-ink xl:hidden">
                        <LogOut size={18} />
                    </button>
                </div>

                <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:px-8 xl:flex-col xl:p-0">
                    {items.map(({ to, label, icon: Icon }) => (
                        <NavLink key={to} to={to} end className={itemClass}>
                            <Icon size={17} /> {label}
                        </NavLink>
                    ))}
                    <Link to="/productos" target="_blank" className={itemClass({ isActive: false })}>
                        <Store size={17} /> Ver tienda
                    </Link>
                </nav>

                <div className="mt-auto hidden items-center gap-3 rounded-2xl bg-soft p-3 xl:flex">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold uppercase text-white">
                        {(admin?.username || "A").charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{admin?.username || "Administrador"}</span>
                    <button onClick={handleLogout} aria-label="Cerrar sesión" className="grid size-8 cursor-pointer place-items-center rounded-full text-mute hover:bg-white hover:text-ink">
                        <LogOut size={16} />
                    </button>
                </div>
            </aside>

            <main className="min-w-0 px-4 py-8 md:px-8 md:py-10 xl:px-12 2xl:px-16">
                <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                        {subtitle && <p className="mt-1 text-sm text-mute">{subtitle}</p>}
                    </div>
                    {actions}
                </header>
                {children}
            </main>
        </div>
    )
}

export default AdminShell

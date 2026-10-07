import { Link } from "react-router-dom"
import { Plus, Package, TrendingUp, Tag, Clock } from "lucide-react"
import { useAdmin } from "../hooks/useAdmin"
import AdminShell from "../components/AdminShell"
import AdminProductList from "../components/AdminProductList"
import { formatPrice } from "../utils/formatPrice"

const Admin = () => {

  const { products = [], admin } = useAdmin()

  const prices = products.map((p) => Number(p.price) || 0)
  const stats = [
    { icon: Package, label: "Productos", value: products.length },
    { icon: TrendingUp, label: "Precio promedio", value: formatPrice(prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0) },
    { icon: Tag, label: "Precio más alto", value: formatPrice(prices.length ? Math.max(...prices) : 0) },
    { icon: Clock, label: "Último agregado", value: products.at(-1)?.name || "—" },
  ]

  return (
    <AdminShell
      title={`Hola, ${admin?.username || "admin"}`}
      subtitle="Gestioná los productos del catálogo de tu tienda."
      actions={<Link to="/agregar-producto" className="btn btn-dark"><Plus size={16} /> Agregar producto</Link>}
    >
      <dl className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card min-w-0 p-4 md:p-5">
            <dt className="flex items-center gap-2 text-sm text-mute">
              <span className="grid size-8 place-items-center rounded-full bg-soft text-ink"><Icon size={15} /></span>
              {label}
            </dt>
            <dd className="mt-4 truncate text-xl font-bold md:text-2xl">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Catálogo actual</h2>
        <Link to="/admin-productos" className="text-sm font-medium text-mute hover:text-ink">Ver todo</Link>
      </div>
      <AdminProductList />
    </AdminShell>
  )
}

export default Admin

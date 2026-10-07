import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import AdminShell from "../components/AdminShell"
import AdminProductList from "../components/AdminProductList"

const ProductsAdmin = () => {
    return (
        <AdminShell
            title="Productos"
            subtitle="Todos los productos publicados en la tienda."
            actions={<Link to="/agregar-producto" className="btn btn-dark"><Plus size={16} /> Agregar producto</Link>}
        >
            <AdminProductList />
        </AdminShell>
    )
}

export default ProductsAdmin

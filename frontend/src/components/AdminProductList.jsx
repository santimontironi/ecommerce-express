import { Link } from "react-router-dom"
import { Trash2, Plus, Package } from "lucide-react"
import Swal from "sweetalert2";
import { useAdmin } from "../hooks/useAdmin"
import { formatPrice } from "../utils/formatPrice"

const AdminProductList = () => {

    const { products, deleteProduct, setProducts, productsLoading } = useAdmin()

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "¿Eliminar este producto?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#111111",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id)
                setProducts(products.filter((product) => product._id !== id))

                Swal.fire({
                    title: "Eliminado",
                    text: "El producto fue eliminado correctamente",
                    icon: "success",
                    confirmButtonColor: "#111111"
                })

            } catch (error) {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un problema al eliminar el producto",
                    icon: "error",
                    confirmButtonColor: "#111111"
                })
            }
        }
    }

    if (productsLoading) {
        return (
            <ul className="card animate-pulse divide-y divide-line overflow-hidden">
                {[0, 1, 2].map((i) => (
                    <li key={i} className="flex items-center gap-4 p-4">
                        <div className="size-14 rounded-xl bg-soft md:size-16" />
                        <div className="h-4 w-1/3 rounded bg-soft" />
                    </li>
                ))}
            </ul>
        )
    }

    if (!products?.length) {
        return (
            <div className="card px-6 py-16 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-soft"><Package size={22} /></span>
                <p className="mt-4 text-lg font-semibold">Todavía no hay productos</p>
                <p className="mt-1 text-sm text-mute">Cargá el primero para que aparezca en la tienda.</p>
                <Link to="/agregar-producto" className="btn btn-dark mt-6"><Plus size={16} /> Agregar producto</Link>
            </div>
        )
    }

    return (
        <div className="card overflow-hidden">
            <div className="hidden grid-cols-[64px_1fr_140px_40px] gap-6 border-b border-line bg-soft/60 px-5 py-3 text-xs font-medium text-mute md:grid">
                <span>Foto</span>
                <span>Producto</span>
                <span className="text-right">Precio</span>
                <span />
            </div>

            <ul className="divide-y divide-line">
                {products.map((product) => (
                    <li key={product._id} className="grid grid-cols-[56px_1fr_40px] items-center gap-4 px-4 py-3 md:grid-cols-[64px_1fr_140px_40px] md:gap-6 md:px-5">
                        <img src={product.image} alt={product.name} className="size-14 rounded-xl bg-soft object-cover md:size-16" />
                        <div className="min-w-0">
                            <p className="truncate font-semibold">{product.name}</p>
                            <p className="truncate text-sm text-mute">{product.description}</p>
                            <p className="mt-1 text-sm font-semibold md:hidden">{formatPrice(product.price)}</p>
                        </div>
                        <span className="hidden text-right font-semibold md:block">{formatPrice(product.price)}</span>
                        <button
                            onClick={() => handleDelete(product._id)}
                            aria-label={`Eliminar ${product.name}`}
                            className="grid size-10 cursor-pointer place-items-center rounded-full text-mute transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 size={17} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminProductList

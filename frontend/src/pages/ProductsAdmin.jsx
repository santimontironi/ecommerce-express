import Product from "../components/Product"
import { AdminContext } from "../../context/adminContext"
import { useContext } from "react"
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const ProductsAdmin = () => {

    const { products, admin, deleteProduct, setProducts, productsLoading } = useContext(AdminContext)

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar este producto?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id)
                const newProducts = products.filter((product) => product._id !== id)
                setProducts(newProducts)


                Swal.fire({
                    title: "Eliminado",
                    text: "El producto fue eliminado correctamente",
                    icon: "success",
                    confirmButtonColor: "#3085d6"
                })

            } catch (error) {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un problema al eliminar el producto",
                    icon: "error",
                    confirmButtonColor: "#3085d6"
                })
            }
        }
    }

    return (
        <div className="w-full mt-10">

            {productsLoading ? <Loader /> : (
                <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid xl:grid-cols-3 xl:w-[1100px] xl:m-auto xl:gap-15">

                    {products?.map((product) => (
                        <div key={product._id}>
                            <Product
                                id={product._id}
                                admin={admin}
                                productImage={product.image}
                                productName={product.name}
                                productPrice={product.price}
                                productDescription={product.description}
                                productStock={product.stock}
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))}

                </div>

            )}

        </div>
    )
}

export default ProductsAdmin
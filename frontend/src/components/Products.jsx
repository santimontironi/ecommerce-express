import Product from "./Product"
import { AdminContext } from "../../context/adminContext"
import { useContext } from "react"

const Products = ({ products }) => {

    const {admin, deleteProduct, setProducts} = useContext(AdminContext)

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            const newProducts = products.filter((product) => product._id !== id);
            setProducts(newProducts);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full mt-10">
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
        </div>
    )
}

export default Products
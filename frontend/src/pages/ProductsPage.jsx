import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import Product from "../components/Product"

const ProductsPage = () => {

  const { allProducts, loading } = useContext(UserContext);

  return (
    <div className="h-screen w-full containerProductsPage">
      <h1>Nuestro catalogo de productos</h1>
      {loading ? <h1>Cargando...</h1> : (

        allProducts.length === 0 ? <h1>No hay productos</h1> : (
          <div className="grid grid-cols-3">
            {allProducts.map((item, index) => (
              <Product key={index} productName={item.name} productDescription={item.description} productPrice={item.price} productImage={item.image} productStock={item.stock} />
            ))}
          </div>
        )
      )}

    </div>
  )
}

export default ProductsPage
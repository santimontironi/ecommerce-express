import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const ProductsPage = () => {

  const { allProducts } = useContext(UserContext);

  return (
    <div>
      <h1>HOLA</h1>
      {allProducts.length === 0 ? <h1>No hay productos</h1> : null}
      
    </div>
  )
}

export default ProductsPage
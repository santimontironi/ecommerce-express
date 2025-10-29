import { useContext } from "react"
import { AllProductsContext } from "../../context/AllProductsContext";
import Product from "../components/Product"

const ProductsPage = () => {

  const { allProducts } = useContext(AllProductsContext);

  return (
    <div className="h-screen w-full containerProductsPage">
      <h1>Nuestro catalogo de productos</h1>
      

        {allProducts.length === 0 ? <h1>No hay productos</h1> : (
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 xl:grid-cols-3 xl:w-[1000px]">
            {allProducts.map((item, index) => (
              <Product key={index} productName={item.name} productDescription={item.description} productPrice={item.price} productImage={item.image} productStock={item.stock} />
            ))}
          </div>
        )}
      

    </div>
  )
}

export default ProductsPage
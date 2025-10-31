import { useContext } from "react"
import { AllProductsContext } from "../../context/AllProductsContext";
import Product from "../components/Product"
import Loader from "../components/Loader";

const ProductsPage = () => {

  const { allProducts, loading } = useContext(AllProductsContext);

  return (
    <div className="min-h-screen w-full pb-10 containerProductsPage">
      <h1 className="text-center text-white xl:text-[50px] h-[100px] text-[24px] xl:py-8 w-full xl:h-[150px] flex items-center justify-center text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)] border-b border-white">Nuestro catálogo de productos</h1>

      {loading ? <Loader /> : (
        allProducts.length === 0 ? <h1>No hay productos</h1> : (
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 xl:grid-cols-3 xl:w-[1000px] 2xl:w-[1200px] md:place-content-center gap-5 md:gap-10 xl:gap-15 mx-auto mt-10">
            {allProducts.map((item, index) => (
              <Product key={index} id={item._id} productName={item.name} productDescription={item.description} productPrice={item.price} productImage={item.image} productStock={item.stock} btnBuy={true} />
            ))}
          </div>
        )
      )}

    </div>
  )
}

export default ProductsPage
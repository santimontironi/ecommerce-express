import { useContext } from "react";
import { AllProductsContext } from "../../context/AllProductsContext";
import imgNoProducts from "../img/no-products.png";
import Product from "../components/Product";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const { allProducts, loading } = useContext(AllProductsContext);

  return (
    <div className="min-h-screen w-full pb-10 containerProductsPage">
      <h1 className="text-center text-white xl:text-[50px] h-[100px] text-[24px] xl:py-8 w-full xl:h-[150px] flex items-center justify-center text-shadow-[5px_5px_10px_rgba(0,0,0,0.8)] border-b border-white">
        Nuestro catálogo de productos
      </h1>

      {loading ? (
        <Loader />
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 gap-6 animate-fadeIn">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-[85%] md:w-[60%] xl:w-[40%]">
            <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-lg mb-4">
              No hay productos disponibles
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Estamos actualizando nuestro catálogo. Vuelve pronto para descubrir
              nuevas incorporaciones 👟
            </p>
            <div className="flex justify-center">
              <img
                src={imgNoProducts}
                alt="No products available"
                className="w-[250px] md:w-[350px] lg:w-[450px] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 xl:grid-cols-3 xl:w-[1000px] 2xl:w-[1200px] md:place-content-center gap-5 md:gap-10 xl:gap-15 mx-auto mt-10">
          {allProducts.map((item, index) => (
            <Product
              key={index}
              id={item._id}
              productName={item.name}
              productDescription={item.description}
              productPrice={item.price}
              productImage={item.image}
              btnBuy={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
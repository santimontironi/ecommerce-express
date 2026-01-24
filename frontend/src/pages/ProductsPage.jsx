import { useContext } from "react";
import { AllProductsContext } from "../../context/AllProductsContext";
import imgNoProducts from "../img/no-products.png";
import Product from "../components/Product";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const { allProducts, loading } = useContext(AllProductsContext);

  return (
    <div className="relative min-h-screen w-full bg-linear-to-br from-black via-gray-800 to-gray-900 pb-10 overflow-hidden">

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-gray-700 to-gray-900 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-br from-gray-600 to-black rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10">
        <div className="text-center py-12 xl:py-16 border-b border-gray-700/50 bg-linear-to-b from-transparent to-gray-900/30 backdrop-blur-sm shadow-2xl">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 tracking-wide">
            Nuestro catálogo de productos
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-20 h-px bg-linear-to-r from-transparent via-gray-500 to-gray-500"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-20 h-px bg-linear-to-l from-transparent via-gray-500 to-gray-500"></div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : allProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 gap-6">
            <div className="backdrop-blur-sm bg-linear-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 p-10 rounded-3xl shadow-2xl w-[85%] md:w-[60%] xl:w-[40%]">
              <div className="mb-6">
                <i className="bi bi-box-seam text-6xl text-gray-400"></i>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No hay productos disponibles
              </h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Estamos actualizando nuestro catálogo. Vuelve pronto para descubrir
                nuevas incorporaciones 👟
              </p>
              <div className="flex justify-center">
                <img
                  src={imgNoProducts}
                  alt="No products available"
                  className="w-[250px] md:w-[350px] lg:w-[450px] opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 xl:grid-cols-3 xl:w-[1000px] 2xl:w-[1200px] md:place-content-center gap-6 md:gap-8 xl:gap-10 mx-auto mt-16 px-4">
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
    </div>
  );
};

export default ProductsPage;
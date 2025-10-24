import { Link } from "react-router-dom"
import { useContext } from "react"
import { AdminContext } from "../../context/adminContext"
import Products from "../components/Products"
import Loader from "../components/Loader"

const Admin = () => {

  const { products, loading } = useContext(AdminContext)

  return (
    <div className="min-h-screen w-full containerAdmin flex flex-col items-center justify-center">

      {loading ? <Loader /> : (
        <>
          <div className="flex flex-col items-center justify-center bg-gray-300 text-center mx-auto
            w-[320px] h-[400px]
            md:w-[640px] md:h-[480px]
            lg:w-[800px] lg:h-[520px]
            xl:w-[960px] xl:h-[560px]
            2xl:w-[1100px] 2xl:h-[600px]
            rounded-2xl p-6 shadow-[5px_5px_20px_rgba(0,0,0,0.8)]">

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-8 font-bold">
              Panel de administrador
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-[600px] mb-10">
              Desde este panel podés gestionar los productos del catálogo, agregar nuevos artículos y mantener
              actualizada la información de tu tienda.
            </p>

            <Link to="/agregar-producto" className="bg-blue-600 text-white font-medium text-base sm:text-lg py-3 px-8 rounded-xl 
            hover:bg-blue-700 active:scale-95 transition-transform duration-200 cursor-pointer">
              Agregar producto
            </Link>
          </div>

          {products?.length === 0 ? (<h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-8 font-bold">No hay productos</h1>) : (
            <Products products={products} />
          ) }
          
        </>

        

      )}





    </div>
  )
}

export default Admin
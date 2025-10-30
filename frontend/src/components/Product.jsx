import { Link } from "react-router-dom"

const Product = ({ id, admin, productName, productPrice, productImage, productDescription, productStock, btnBuy, handleDelete }) => {

    return (
        <div className="w-[280px] mx-auto xl:w-[320px] xl:h-auto flex flex-col border border-gray-700 rounded-2xl bg-linear-to-br from-[#1a1a1a] to-[#333] hover:shadow-[10px_10px_50px_rgba(0,0,0,0.8)] hover:scale-105 transform transition-all duration-300">
            <div className="flex flex-col gap-3 justify-center text-center text-white p-3">
                <img className="mb-5 rounded-xl transition-transform duration-500 hover:scale-105" src={`http://localhost:3000/uploads/${productImage}`} alt={productName} />
                <h1 className="xl:text-[23px] font-bold text-yellow-400">{productName}</h1>
                <p className="text-gray-300 text-sm">{productDescription}</p>
                <span className="text-lg font-semibold text-green-400">${productPrice}</span>
                <span className="mb-5 text-sm text-gray-400">Stock: {productStock}</span>
                {btnBuy ? (
                    <Link className="bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white p-2.5 text-center rounded-lg font-medium shadow-md transition-all duration-300" to={`/checkout/${id}`}>
                        Comprar
                    </Link>
                ) : null}
                {admin ? (
                    <button className="bg-linear-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white p-2.5 text-center rounded-lg font-medium shadow-md transition-all duration-300" onClick={() => handleDelete(id)}>
                        Eliminar
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default Product
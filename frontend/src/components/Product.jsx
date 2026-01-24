import { Link } from "react-router-dom"

const Product = ({ id, admin, productName, productPrice, productImage, productDescription, btnBuy, handleDelete }) => {

    return (
        <div className="w-[280px] mx-auto xl:w-[320px] xl:h-auto flex flex-col rounded-2xl bg-linear-to-br from-gray-800 to-gray-600 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="flex flex-col gap-4 justify-center text-center text-white p-5">

                <div className="relative overflow-hidden rounded-xl bg-gray-900/50 p-2">
                    <img
                        className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-110"
                        src={productImage}
                        alt={productName}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>

                <h1 className="text-xl xl:text-2xl font-bold text-white">
                    {productName}
                </h1>

                <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
                    {productDescription}
                </p>

                <div className="my-2">
                    <span className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        ${productPrice}
                    </span>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    {btnBuy ? (
                        <Link
                            className="group bg-linear-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-black p-3 text-center rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                            to={`/checkout/${id}`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                Comprar
                            </span>
                        </Link>
                    ) : null}

                    {admin ? (
                        <button
                            className="group bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white p-3 text-center rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                            onClick={() => handleDelete(id)}
                        >
                            <span className="flex items-center justify-center gap-2">
                                Eliminar
                                <i className="bi bi-trash text-lg group-hover:scale-110 transition-transform"></i>
                            </span>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Product
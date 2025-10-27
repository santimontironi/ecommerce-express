import { Link } from "react-router-dom"

const Product = ({ id, admin, productName, productPrice, productImage, productDescription, productStock, btnBuy, handleDelete }) => {

    return (
        <div className="w-[280px] mx-auto xl:w-[300px] xl:h-auto flex flex-col border-2 border-white p-2.5 bg-linear-to-br from-black to-[#505050] transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col justify-center text-center text-white">
                <img className="mb-5" src={ `http://localhost:3000/uploads/${productImage}`} alt={productName} />
                <h1>Producto: {productName}</h1>
                <span>Precio: ${productPrice}</span>
                <p>Descripción: {productDescription}</p>
                <span className="mb-5">Stock: {productStock}</span>
                {btnBuy ? <Link className="bg-blue-400 text-white p-2.5 text-center" to={`/checkout/${id}`}>Comprar</Link> : null}
                {admin ? (
                    <button className="bg-red-500 cursor-pointer hover:bg-red-400 text-white p-2.5 text-center" onClick={() => handleDelete(id)}>Eliminar</button>
                ) : null}
            </div>
        </div>
    )
}

export default Product
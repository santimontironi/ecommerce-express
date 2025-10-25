import { Link } from "react-router-dom"

const Product = ({ id, productName, productPrice, productImage, productDescription, productStock, btnBuy }) => {
    return (
        <div className="xl:w-[300px] xl:h-auto flex flex-col border-2 border-blue-600 p-2.5">
            <div className="flex flex-col justify-center">
                <img src={ `http://localhost:3000/uploads/${productImage}`} alt={productName} />
                <h1>{productName}</h1>
                <p>{productPrice}</p>
                <span>{productDescription}</span>
                <span>{productStock}</span>
                {btnBuy ? <Link className="bg-blue-400 text-white p-2.5 text-center" to={`/checkout/${id}`}>Comprar</Link> : null}
            </div>
        </div>
    )
}

export default Product
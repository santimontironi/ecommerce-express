import { Link } from "react-router-dom"

const Product = ({ id, productName, productPrice, productImage, productDescription, productStock, productCategory }) => {
    return (
        <div className="xl:w-[300px] xl:h-auto flex flex-col border-2 border-blue-600 p-[10px]">
            <div className="flex flex-col justify-center">
                <h1>{productName}</h1>
                <p>{productPrice}</p>
                <img src={productImage} alt={productName} />
                <span>{productDescription}</span>
                <span>{productStock}</span>
                <span>{productCategory}</span>
                <Link className="bg-blue-400 text-white p-[10px] text-center" to={`/checkout/${id}`}>Comprar</Link>
            </div>
        </div>
    )
}

export default Product
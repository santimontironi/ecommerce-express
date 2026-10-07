import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { formatPrice } from "../utils/formatPrice"

const Product = ({ id, productName, productPrice, productImage, productDescription }) => {

    return (
        <article className="group flex flex-col">
            <Link to={`/checkout/${id}`} className="block aspect-square overflow-hidden rounded-2xl bg-soft">
                <img
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={productImage}
                    alt={productName}
                    loading="lazy"
                />
            </Link>

            <div className="flex flex-1 flex-col px-1 pt-4">
                <h3 className="font-semibold leading-snug">{productName}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-mute">{productDescription}</p>

                <div className="mt-auto flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
                    <span className="text-lg font-bold">{formatPrice(productPrice)}</span>
                    <Link
                        to={`/checkout/${id}`}
                        className="btn btn-dark h-9 w-full px-4 text-xs md:w-auto"
                    >
                        <ShoppingBag size={14} /> Comprar
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Product

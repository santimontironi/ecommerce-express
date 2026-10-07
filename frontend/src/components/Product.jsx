import { Link } from "react-router-dom"
import { ShoppingBag, ArrowUpRight } from "lucide-react"
import { formatPrice } from "../utils/formatPrice"

const Product = ({ id, productName, productPrice, productImage, productDescription }) => {

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <Link to={`/checkout/${id}`} className="relative block aspect-square overflow-hidden rounded-xl bg-soft">
                <img
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
                    src={productImage}
                    alt={productName}
                    loading="lazy"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-sm backdrop-blur translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Ver <ArrowUpRight size={14} />
                </span>
            </Link>

            <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                <h3 className="font-semibold leading-snug transition-colors duration-200 group-hover:text-accent">{productName}</h3>
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

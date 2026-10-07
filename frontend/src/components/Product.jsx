import { Link } from "react-router-dom"
import { ShoppingBag, ArrowUpRight } from "lucide-react"
import { formatPrice } from "../utils/formatPrice"

const Product = ({ id, productName, productPrice, productImage, productDescription }) => {

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-ink/5 ring-1 ring-line transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <Link to={`/checkout/${id}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-ink via-accent-dark to-accent">
                <img
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
                    src={productImage}
                    alt={productName}
                    loading="lazy"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-ink/30 via-transparent to-accent/30 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-accent">
                    <ArrowUpRight size={18} />
                </span>
            </Link>

            <div className="relative -mt-5 flex flex-1 flex-col rounded-t-2xl bg-white px-4 pt-5 pb-4 md:px-5">
                <h3 className="text-base font-bold leading-snug tracking-tight md:text-lg">{productName}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mute">{productDescription}</p>

                <div className="mt-auto flex flex-col gap-3 pt-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="block text-[11px] font-semibold tracking-widest text-mute uppercase">Precio</span>
                        <span className="text-xl font-extrabold tracking-tight">{formatPrice(productPrice)}</span>
                    </div>
                    <Link
                        to={`/checkout/${id}`}
                        className="btn btn-accent h-10 w-full rounded-xl px-5 text-xs shadow-md shadow-accent/25 md:w-auto"
                    >
                        <ShoppingBag size={15} /> Comprar
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Product

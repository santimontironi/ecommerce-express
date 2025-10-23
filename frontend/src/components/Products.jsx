import Product from "./Product"

const Products = ({ products }) => {

    return (
        <div className="w-full h-screen">
            <div className="xl:grid xl:grid-cols-3 xl:w-[1100px] xl:m-auto xl:gap-5 place-content-center justify-center items-stretch">

                {products.map((product) => (
                    <Product key={product.id}
                        id={product.id}
                        productName={product.nombre}
                        productPrice={product.precio}
                        productImage={product.imagen}
                        productDescription={product.descripcion}
                        productStock={product.stock}
                        productCategory={product.categoria}
                    />
                ))}

            </div>
        </div>
    )
}

export default Products
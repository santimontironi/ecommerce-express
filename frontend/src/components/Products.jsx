import Product from "./Product"

const Products = ({ products }) => {

    return (
        <div className="w-full mt-10">
            <div className="xl:grid xl:grid-cols-3 xl:w-[1100px] xl:m-auto xl:gap-5">

                {products.map((product) => (
                    <Product key={product.id}
                        id={product.id}
                        productImage={product.image}
                        productName={product.name}
                        productPrice={product.price}
                        productDescription={product.description}
                        productStock={product.stock}
                    />
                ))}

            </div>
        </div>
    )
}

export default Products
import { PackageOpen } from "lucide-react";
import { useAllProducts } from "../hooks/useAllProducts"
import Product from "../components/Product";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const { allProducts, loading } = useAllProducts();

  return (
    <>
      <Nav />
      <main className="container-page min-h-svh pt-24 pb-20 xl:pt-32">
        <header className="flex flex-col gap-2 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="section-title">Nuestros productos</h1>
            <p className="mt-2 text-mute">Indumentaria deportiva de primera calidad.</p>
          </div>
          {!loading && <span className="text-sm text-mute">{allProducts.length} productos</span>}
        </header>

        {loading ? (
          <Loader />
        ) : allProducts.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-soft px-6 py-20 text-center">
            <PackageOpen size={36} strokeWidth={1.5} className="mx-auto text-mute" />
            <h2 className="mt-4 text-xl font-semibold">No hay productos disponibles</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-mute">
              Estamos actualizando nuestro catálogo. Volvé pronto para descubrir nuevas incorporaciones.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {allProducts.map((item) => (
              <Product
                key={item._id}
                id={item._id}
                productName={item.name}
                productDescription={item.description}
                productPrice={item.price}
                productImage={item.image}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;

import { useContext } from "react";
import { ProductByIdContext } from "../../context/ProductByIdContext";
import Product from "../components/Product";
import { useForm } from "react-hook-form";
import { preferenceApi } from "../../api/api";

const Checkout = () => {
  const { productById, loading } = useContext(ProductByIdContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await preferenceApi({
        title: productById.name,
        unit_price: Number(productById.price),
        quantity: Number(data.quantity),
        buyer_email: data.email,
        buyer_address: data.address,
        buyer_phone: data.phone,
      });
      window.location.href = response.data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-4 containerCheckout">
      
      <div className="w-[360px] md:w-[720px] lg:w-[960px] bg-white rounded-xl shadow-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

      
        <div className="flex flex-col items-center gap-3">
          {loading && productById._id === 0 ? (
            <p className="text-center text-[20px]">Cargando...</p>
          ) : (
            <div className="w-[320px] md:w-[320px] lg:w-[400px]">
              <Product
                key={productById._id}
                id={productById._id}
                productName={productById.name}
                productPrice={productById.price}
                productImage={productById.image}
                productDescription={productById.description}
                productStock={productById.stock}
              />
            </div>
          )}

          <div className="w-[320px] md:w-[320px] lg:w-[400px] bg-gray-100 rounded-xl p-3 text-[14px]">
            <p className="font-medium">Resumen</p>
            <p className="mt-1.5">Nombre: {productById?.name || "-"}</p>
            <p>Precio unitario: ${productById?.price ?? "-"}</p>
          </div>
        </div>

    
        <div className="w-full flex flex-col">
          <h2 className="text-[20px] font-semibold mb-3 bg-blue-600 text-white p-3 text-center">Finalización de compra</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Nombre</label>
              <input
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("name", { required: true })}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  El nombre es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Apellido</label>
              <input
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("surname", { required: true })}
                placeholder="Tu apellido"
              />
              {errors.surname && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  El apellido es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Email</label>
              <input
                type="email"
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("email", { required: true })}
                placeholder="Tu email"
              />
              {errors.email && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  El email es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Teléfono</label>
              <input
                type="text"
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("phone", { required: true })}
                placeholder="Tu teléfono"
              />
              {errors.phone && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  El número de teléfono es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Dirección</label>
              <input
                type="text"
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("address", { required: true })}
                placeholder="Tu dirección"
              />
              {errors.address && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  La dirección es obligatoria
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[13px] mb-1.5">Cantidad</label>
              <input
                type="number"
                min={1}
                className="h-11 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register("quantity", { required: true })}
                placeholder="Cantidad a comprar"
              />
              {errors.quantity && (
                <span className="text-[12px] text-red-600 mt-1.5">
                  La cantidad es obligatoria
                </span>
              )}
            </div>

            <button
              type="submit"
              className="h-11 mt-1.5 bg-blue-600 text-white font-medium text-[16px] rounded-lg hover:opacity-95 transition-opacity cursor-pointer"
            >
              Pagar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
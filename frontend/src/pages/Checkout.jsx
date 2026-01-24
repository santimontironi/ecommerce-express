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
        buyer_name: data.name,
        buyer_surname: data.surname,
      });
      window.location.href = response.data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-linear-to-br from-gray-800 via-gray-700 to-gray-800 flex justify-center items-center p-4 py-24 overflow-hidden">

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-gray-600 to-gray-700 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-br from-gray-500 to-gray-700 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 w-full max-w-[360px] md:max-w-[720px] lg:max-w-[1100px] bg-linear-to-br from-gray-700/90 to-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="flex flex-col items-center gap-6">
          <div className="w-full text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Tu Producto
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="w-16 h-px bg-linear-to-r from-transparent via-gray-500 to-gray-500"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-16 h-px bg-linear-to-l from-transparent via-gray-500 to-gray-500"></div>
            </div>
          </div>

          {loading && productById._id === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-16 h-16 border-4 border-gray-500 border-t-white rounded-full animate-spin"></div>
              <p className="text-gray-300 text-lg">Cargando producto...</p>
            </div>
          ) : (
            <div className="w-full max-w-[320px] mx-auto">
              <Product
                key={productById._id}
                id={productById._id}
                productName={productById.name}
                productPrice={productById.price}
                productImage={productById.image}
                productDescription={productById.description}
              />
            </div>
          )}

          <div className="w-full max-w-[320px] mx-auto bg-linear-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <i className="bi bi-receipt text-2xl text-gray-300"></i>
              <h3 className="text-xl font-bold text-white">Resumen de compra</h3>
            </div>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-sm">Producto:</span>
                <span className="font-semibold text-white">{productById?.name || "-"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">Precio unitario:</span>
                <span className="text-lg font-bold text-white">${productById?.price ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
              Finalizar Compra
            </h2>
            <p className="text-gray-400">Completa tus datos para proceder al pago</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <i className="bi bi-person"></i>
                  Nombre
                </label>
                <input
                  className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.name ? 'border-red-500' : 'border-gray-600/50'
                    } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                  {...register("name", { required: true })}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <i className="bi bi-exclamation-circle"></i>
                    El nombre es obligatorio
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <i className="bi bi-person"></i>
                  Apellido
                </label>
                <input
                  className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.surname ? 'border-red-500' : 'border-gray-600/50'
                    } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                  {...register("surname", { required: true })}
                  placeholder="Tu apellido"
                />
                {errors.surname && (
                  <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <i className="bi bi-exclamation-circle"></i>
                    El apellido es obligatorio
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <i className="bi bi-envelope"></i>
                Email
              </label>
              <input
                type="email"
                className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.email ? 'border-red-500' : 'border-gray-600/50'
                  } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                {...register("email", { required: true })}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  El email es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <i className="bi bi-telephone"></i>
                Teléfono
              </label>
              <input
                type="text"
                className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.phone ? 'border-red-500' : 'border-gray-600/50'
                  } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                {...register("phone", { required: true })}
                placeholder="+54 123 456 7890"
              />
              {errors.phone && (
                <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  El teléfono es obligatorio
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <i className="bi bi-geo-alt"></i>
                Dirección
              </label>
              <input
                type="text"
                className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.address ? 'border-red-500' : 'border-gray-600/50'
                  } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                {...register("address", { required: true })}
                placeholder="Calle, número, ciudad"
              />
              {errors.address && (
                <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  La dirección es obligatoria
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <i className="bi bi-cart"></i>
                Cantidad
              </label>
              <input
                type="number"
                min={1}
                className={`px-4 py-3 rounded-xl bg-gray-700/50 text-white border ${errors.quantity ? 'border-red-500' : 'border-gray-600/50'
                  } focus:outline-none focus:border-gray-400 focus:bg-gray-700 transition-all duration-300`}
                {...register("quantity", { required: true })}
                placeholder="1"
              />
              {errors.quantity && (
                <span className="text-red-400 text-xs mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  La cantidad es obligatoria
                </span>
              )}
            </div>

            <button
              type="submit"
              className="group mt-4 px-8 py-4 bg-linear-to-r from-white to-gray-200 text-black font-bold text-lg uppercase tracking-wide rounded-xl hover:from-gray-100 hover:to-gray-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
            >
              <span className="flex items-center justify-center gap-3">
                Proceder al Pago
                <i className="bi bi-credit-card text-xl group-hover:scale-110 transition-transform"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
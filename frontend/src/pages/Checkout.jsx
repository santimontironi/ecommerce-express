import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductById } from "../hooks/useProductById"
import { preferenceApi } from "../api/api";
import { formatPrice } from "../utils/formatPrice";
import Nav from "../components/Nav";
import GoBack from "../components/GoBack";

const fields = [
  { name: "name", label: "Nombre", placeholder: "Tu nombre", error: "El nombre es obligatorio" },
  { name: "surname", label: "Apellido", placeholder: "Tu apellido", error: "El apellido es obligatorio" },
  { name: "email", label: "Email", type: "email", placeholder: "ejemplo@correo.com", error: "El email es obligatorio" },
  { name: "phone", label: "Teléfono", type: "tel", placeholder: "+54 123 456 7890", error: "El teléfono es obligatorio" },
  { name: "address", label: "Dirección", placeholder: "Calle, número, ciudad", error: "La dirección es obligatoria", wide: true },
]

const Checkout = () => {
  const { productById, loading } = useProductById();
  const [payError, setPayError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { quantity: 1 } });

  const quantity = Math.max(Number(watch("quantity")) || 0, 0);

  async function onSubmit(data) {
    setPayError("");
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
      setPayError("No pudimos iniciar el pago. Probá de nuevo en unos minutos.");
    }
  }

  if (!loading && !productById?._id) {
    return (
      <>
        <Nav />
        <main className="container-page grid min-h-svh place-items-center pt-24 pb-20">
          <div className="max-w-md text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-soft"><PackageX size={28} strokeWidth={1.75} /></span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">Producto no disponible</h1>
            <p className="mt-2 text-mute">Este producto ya no está en nuestro catálogo.</p>
            <Link to="/productos" className="btn btn-dark mt-8">Ver productos</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="container-page min-h-svh pt-24 pb-20 xl:pt-32">
        <GoBack url="/productos" />
        <h1 className="section-title mt-4">Finalizar compra</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid items-start gap-6 xl:grid-cols-5">

          <section className="card p-6 md:p-8 xl:col-span-3">
            <h2 className="text-lg font-semibold">Tus datos</h2>
            <p className="mt-1 text-sm text-mute">Los usamos para coordinar la entrega de tu pedido.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {fields.map(({ name, label, type = "text", placeholder, error, wide }) => (
                <div key={name} className={wide ? "md:col-span-2" : ""}>
                  <label htmlFor={`checkout-${name}`} className="field-label">{label}</label>
                  <input
                    id={`checkout-${name}`}
                    type={type}
                    placeholder={placeholder}
                    aria-invalid={errors[name] ? "true" : "false"}
                    className="field"
                    {...register(name, { required: error })}
                  />
                  {errors[name] && <span className="field-error">{errors[name].message}</span>}
                </div>
              ))}
            </div>
          </section>

          <aside className="card p-6 md:p-8 xl:sticky xl:top-28 xl:col-span-2">
            <h2 className="text-lg font-semibold">Resumen</h2>

            {loading ? (
              <div className="mt-6 flex animate-pulse gap-4">
                <div className="size-20 rounded-xl bg-soft" />
                <div className="flex-1 space-y-2 pt-2">
                  <div className="h-4 w-2/3 rounded bg-soft" />
                  <div className="h-3 w-1/2 rounded bg-soft" />
                </div>
              </div>
            ) : (
              <div className="mt-6 flex gap-4">
                <img src={productById.image} alt={productById.name} className="size-20 shrink-0 rounded-xl bg-soft object-cover" />
                <div className="min-w-0">
                  <p className="font-semibold">{productById.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-mute">{productById.description}</p>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-line pt-6">
              <label htmlFor="checkout-quantity" className="field-label">Cantidad</label>
              <input
                id="checkout-quantity"
                type="number"
                min={1}
                aria-invalid={errors.quantity ? "true" : "false"}
                className="field w-28"
                {...register("quantity", {
                  required: "La cantidad es obligatoria",
                  min: { value: 1, message: "Mínimo 1 unidad" },
                })}
              />
              {errors.quantity && <span className="field-error">{errors.quantity.message}</span>}
            </div>

            <dl className="mt-6 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-mute">Precio unitario</dt>
                <dd>{formatPrice(productById?.price)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mute">Cantidad</dt>
                <dd>× {quantity}</dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
                <dt className="font-semibold">Total</dt>
                <dd className="text-xl font-bold">{formatPrice((productById?.price || 0) * quantity)}</dd>
              </div>
            </dl>

            <button type="submit" disabled={isSubmitting || loading} className="btn btn-accent mt-6 w-full">
              <Lock size={15} /> {isSubmitting ? "Redirigiendo…" : "Pagar con Mercado Pago"}
            </button>
            {payError && <p role="alert" className="mt-3 text-sm text-red-600">{payError}</p>}
          </aside>
        </form>
      </main>
    </>
  );
};

export default Checkout;

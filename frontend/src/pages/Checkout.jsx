import { useContext } from "react"
import { ProductByIdContext } from "../../context/ProductByIdContext";
import Product from "../components/Product";
import { useForm } from "react-hook-form"
import { preferenceApi } from "../../api/api";

const Checkout = () => {

  const { productById, loading } = useContext(ProductByIdContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

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
      window.location.href = response.data.init_point
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-screen">
      <div>
        <div>
          {loading && productById._id === 0 ? <p className="text-center text-2xl">Cargando...</p>
            :
            <Product key={productById._id}
              id={productById._id}
              productName={productById.name}
              productPrice={productById.price}
              productImage={productById.image}
              productDescription={productById.description}
              productStock={productById.stock}
            />}
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Nombre</label>
              <input
                {...register("name", { required: true })}
                placeholder="Tu nombre"
              />
              {errors.name && <span>El nombre es obligatorio</span>}
            </div>

            <div>
              <label>Apellido</label>
              <input
                {...register("surname", { required: true })}
                placeholder="Tu apellido"
              />
              {errors.name && <span>El apellido es obligatorio</span>}
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Tu email"
              />
              {errors.email && <span>El email es obligatorio</span>}
            </div>

            <div>
              <label>Teléfono</label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Tu teléfono"
              />
              {errors.email && <span>El número de teléfono es obligatorio</span>}
            </div>

            <div>
              <label>Dirección</label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Tu dirección"
              />
              {errors.email && <span>La dirección es obligatoria</span>}
            </div>

            <div>
              <label>Cantidad</label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                placeholder="Cantidad de stock a comprar"
              />
              {errors.email && <span>La cantidad de productos al comprar es obligatoria</span>}
            </div>

            <button type="submit">Pagar</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Checkout
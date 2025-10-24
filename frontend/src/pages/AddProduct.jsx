import { useContext } from "react"
import { AdminContext } from "../../context/adminContext"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddProduct = () => {

    const { addProduct, loading } = useContext(AdminContext)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleForm(data) {
        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('stock', data.stock)

        addProduct(formData)
        navigate('/admin')
    }

    return (
        <div className="min-h-screen w-full">
            {loading ? <Loader /> : (
                <form method="post" onSubmit={handleSubmit(handleForm)}>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="Imagen">Imagen</label>
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            id="imagen"
                            name="image"
                            accept="image/*"
                        />
                        {errors.image && <span className="text-red-600">La imagen es requerida</span>}
                    </div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="Titulo">Titulo</label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            id="titulo"
                            name="title"
                            placeholder="Titulo"
                        />
                        {errors.title && <span className="text-red-600">El titulo es requerido</span>}
                    </div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="Descripcion">Descripcion</label>
                        <input
                            {...register("description", { required: true })}
                            type="text"
                            id="descripcion"
                            name="description"
                            placeholder="Descripcion"
                        />
                        {errors.description && <span className="text-red-600">La descripcion es requerida</span>}
                    </div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="Precio">Precio</label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            id="precio"
                            name="price"
                            placeholder="Precio"
                        />
                        {errors.price && <span className="text-red-600">El precio es requerido</span>}
                    </div>

                    <div className="flex flex-col mb-3">
                        <label htmlFor="Stock">Stock</label>
                        <input
                            {...register("stock", { required: true })}
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder="Stock"
                        />
                        {errors.stock && <span className="text-red-600">El stock es requerido</span>}
                    </div>


                </form>
            )}
        </div>
    )
}

export default AddProduct
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../context/adminContext"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoBack from "../components/GoBack";

const AddProduct = () => {

    const { addProduct } = useContext(AdminContext)

    const [correct, setCorrect] = useState(false);

    const[errorSubmit,setErrorSubmit] = useState('')

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleForm(data) {
        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('stock', data.stock)

        try{
            setCorrect(true)
            await addProduct(formData)
        }
        catch(error){
            setErrorSubmit(error.response?.data?.message || 'Error al agregar un producto')
            setCorrect(false)
        }
        
    }

    useEffect(() => {
        if(correct){
            navigate('/admin')
        }
    },[correct])



    return (
        <div className="containerAddProduct min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">

            <GoBack url="/admin" />
            

            <form method="post" onSubmit={handleSubmit(handleForm)} className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] bg-white p-6 rounded-lg shadow-lg">

                <h1 className="text-center text-2xl mb-4 bg-black text-white p-3 rounded-lg">Nuevo producto</h1>

                <div className="flex flex-col mb-4">
                    <label htmlFor="Imagen" className="text-[16px] font-semibold text-gray-700 mb-2">Imagen</label>
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        id="imagen"
                        name="image"
                        accept="image/*"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.image && <span className="text-[14px] text-red-600 mt-1">La imagen es requerida</span>}
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="Titulo" className="text-[16px] font-semibold text-gray-700 mb-2">Titulo</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        id="titulo"
                        name="name"
                        placeholder="Titulo"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <span className="text-[14px] text-red-600 mt-1">El titulo es requerido</span>}
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="Descripcion" className="text-[16px] font-semibold text-gray-700 mb-2">Descripcion</label>
                    <input
                        {...register("description", { required: true })}
                        type="text"
                        id="descripcion"
                        name="description"
                        placeholder="Descripcion"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && <span className="text-[14px] text-red-600 mt-1">La descripcion es requerida</span>}
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="Precio" className="text-4 font-semibold text-gray-700 mb-2">Precio</label>
                    <input
                        {...register("price", { required: true })}
                        type="number"
                        id="precio"
                        name="price"
                        placeholder="Precio"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <span className="text-[14px] text-red-600 mt-1">El precio es requerido</span>}
                </div>

                <div className="flex flex-col mb-6">
                    <label htmlFor="Stock" className="text-4 font-semibold text-gray-700 mb-2">Stock</label>
                    <input
                        {...register("stock", { required: true })}
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="Stock"
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.stock && <span className="text-[14px] text-red-600 mt-1">El stock es requerido</span>}
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] h-12 bg-blue-600 text-white text-[16px] font-semibold rounded-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">Agregar producto</button>
                </div>

            </form>

            {errorSubmit && <span className="text-[14px] text-red-600 mt-1">{errorSubmit}</span>}

        </div>
    )
}

export default AddProduct
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin"
import AdminShell from "../components/AdminShell";
import GoBack from "../components/GoBack";

const AddProduct = () => {

    const { addProduct } = useAdmin()

    const [errorSubmit, setErrorSubmit] = useState('')

    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    // ponytail: el object URL no se revoca; a lo sumo unas pocas imágenes por visita
    const imageFile = watch("image")?.[0]
    const preview = useMemo(() => imageFile ? URL.createObjectURL(imageFile) : null, [imageFile])

    async function handleForm(data) {
        const formData = new FormData()

        formData.append('image', data.image[0])
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)

        try {
            await addProduct(formData)
            navigate('/admin')
        }
        catch (error) {
            setErrorSubmit(error.response?.data?.message || 'Error al agregar un producto')
        }
    }

    return (
        <AdminShell title="Nuevo producto" subtitle="Completá los datos para publicarlo en la tienda." actions={<GoBack url="/admin" />}>

            <form method="post" onSubmit={handleSubmit(handleForm)} noValidate className="grid items-start gap-5 xl:grid-cols-12">

                <div className="card p-5 md:p-6 xl:col-span-5">
                    <span className="field-label">Imagen</span>
                    <label
                        htmlFor="imagen"
                        className={`relative grid aspect-square cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed bg-soft transition-colors hover:border-ink ${errors.image ? "border-red-500" : "border-line"}`}
                    >
                        {preview ? (
                            <img src={preview} alt="Vista previa" className="absolute inset-0 size-full object-cover" />
                        ) : (
                            <span className="flex flex-col items-center gap-3 px-6 text-center text-mute">
                                <ImagePlus size={28} strokeWidth={1.5} />
                                <span className="text-sm">Hacé click para subir una foto</span>
                            </span>
                        )}
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            id="imagen"
                            accept="image/*"
                            className="sr-only"
                        />
                    </label>
                    {errors.image && <span className="field-error">La imagen es requerida</span>}
                </div>

                <div className="card flex flex-col gap-5 p-5 md:p-6 xl:col-span-7">
                    <div>
                        <label htmlFor="titulo" className="field-label">Título</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            id="titulo"
                            placeholder="Ej: Remera dry-fit"
                            aria-invalid={errors.name ? "true" : "false"}
                            className="field"
                        />
                        {errors.name && <span className="field-error">El título es requerido</span>}
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="field-label">Descripción</label>
                        <textarea
                            {...register("description", { required: true })}
                            id="descripcion"
                            rows="4"
                            placeholder="Material, talles, colores…"
                            aria-invalid={errors.description ? "true" : "false"}
                            className="field resize-none"
                        />
                        {errors.description && <span className="field-error">La descripción es requerida</span>}
                    </div>

                    <div>
                        <label htmlFor="precio" className="field-label">Precio (ARS)</label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            min={0}
                            id="precio"
                            placeholder="0"
                            aria-invalid={errors.price ? "true" : "false"}
                            className="field"
                        />
                        {errors.price && <span className="field-error">El precio es requerido</span>}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-line pt-5 md:flex-row md:items-center">
                        <button type="submit" disabled={isSubmitting} className="btn btn-dark">
                            {isSubmitting ? "Guardando…" : "Agregar producto"}
                        </button>
                        {errorSubmit && <p role="alert" className="text-sm text-red-600">{errorSubmit}</p>}
                    </div>
                </div>

            </form>
        </AdminShell>
    )
}

export default AddProduct

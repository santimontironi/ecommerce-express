import { useContext } from "react"
import { AdminContext } from "../../context/adminContext"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddProduct = () => {

    const {addProduct, loading} = useContext(AdminContext)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleForm(data){

    }

    return (
        <div className="min-h-screen w-full">
            {loading ? <Loader /> : (
                <form method="post" onSubmit={handleSubmit(handleForm)}>
                    
                </form>
            )}
        </div>
    )
}

export default AddProduct
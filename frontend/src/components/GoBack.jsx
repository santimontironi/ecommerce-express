import { useNavigate } from "react-router-dom"

const GoBack = ({ url }) => {

    const navigate = useNavigate()

    return (
        <div className="absolute top-10 left-10 text-white text-2xl">
            <button className="cursor-pointer" onClick={() => navigate(url)}><i className="bi bi-arrow-left"></i> Volver</button>
        </div>
    )
}

export default GoBack
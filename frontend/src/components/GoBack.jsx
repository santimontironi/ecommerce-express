import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const GoBack = ({ url, className = "" }) => {

    const navigate = useNavigate()

    return (
        <button className={`inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-mute transition-colors hover:text-ink ${className}`} onClick={() => navigate(url)}>
            <ArrowLeft size={16} /> Volver
        </button>
    )
}

export default GoBack

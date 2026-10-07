import logo from "../img/logo.jpg"

// El jpg trae margen blanco alrededor del círculo: lo recortamos para que funcione sobre cualquier fondo
const Logo = ({ className = "size-10" }) => {
    return (
        <span className={`block shrink-0 overflow-hidden rounded-full ${className}`}>
            <img src={logo} alt="Nuno Deportes" className="size-full scale-[1.32] object-cover" />
        </span>
    )
}

export default Logo

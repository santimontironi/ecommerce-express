import { Link } from "react-router-dom"
import { ArrowRight, Gem, Sparkles, Scissors, MessagesSquare } from "lucide-react"
import aboutImg from "../img/nosotrosimg.jpg"

const differentials = [
    {
        icon: Gem,
        title: "Calidad superior",
        text: "Materiales de alta tecnología con resistencia, elasticidad y transpirabilidad excepcionales.",
    },
    {
        icon: Sparkles,
        title: "Diseño exclusivo",
        text: "Cada prenda combina comodidad y estilo, pensada para tu rendimiento.",
    },
    {
        icon: Scissors,
        title: "Personalización",
        text: "Confeccionamos prendas a medida que se ajustan a tu cuerpo y necesidades.",
    },
    {
        icon: MessagesSquare,
        title: "Atención personalizada",
        text: "Te asesoramos para que encuentres la prenda perfecta para tus objetivos.",
    },
]

const AboutUs = () => {
    return (
        <div className="container-page py-16 md:py-20 xl:py-24">

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="section-title">Sobre nosotros</h2>
                <p className="mt-3 text-mute">Pasión por el deporte, compromiso con la calidad.</p>
            </div>

            <div className="mt-12 grid items-center gap-10 md:grid-cols-2 xl:gap-16">
                <img
                    src={aboutImg}
                    alt="Equipamiento deportivo"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-3xl object-cover"
                />

                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="text-lg font-semibold">Nuestra historia</h3>
                        <p className="mt-2 leading-relaxed text-mute">
                            En <strong className="font-semibold text-ink">Nuno Deportes</strong> creemos que el deporte y el estilo van de la mano.
                            Desde nuestros inicios nos especializamos en crear ropa deportiva que no solo se adapta
                            perfectamente a tu cuerpo, sino que también refleja tu personalidad.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Nuestra misión</h3>
                        <p className="mt-2 leading-relaxed text-mute">
                            Acompañarte en cada movimiento con ropa que te inspire a superarte día a día. Porque no hay
                            nada más auténtico que vestirte con algo hecho especialmente para vos.
                        </p>
                    </div>
                    <Link to="/productos" className="btn btn-dark self-start">
                        Ver productos <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <ul className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
                {differentials.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="rounded-2xl bg-soft p-6">
                        <span className="grid size-11 place-items-center rounded-full bg-white">
                            <Icon size={19} strokeWidth={1.75} />
                        </span>
                        <h4 className="mt-5 font-semibold">{title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-mute">{text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AboutUs

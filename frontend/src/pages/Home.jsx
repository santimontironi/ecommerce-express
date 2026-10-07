import { Link } from 'react-router-dom'
import { ArrowRight, Award, Headset, Ruler, CreditCard } from 'lucide-react'
import Logo from '../components/Logo'

const benefits = [
  { icon: Award, title: "Calidad premium", text: "Materiales de alta tecnología" },
  { icon: Headset, title: "Atención personal", text: "Te asesoramos en cada paso" },
  { icon: Ruler, title: "Diseño a medida", text: "Prendas hechas para vos" },
  { icon: CreditCard, title: "Pago seguro", text: "Con Mercado Pago" },
]

const tape = ["Calidad premium", "Atención personal", "Rendimiento", "Diseño a medida"]

const Home = () => {
  return (
    <>
      <div className="container-page pt-20 xl:pt-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
          {/* Halo suave detrás del logo para darle profundidad al banner */}
          <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-accent/25 blur-3xl md:size-[28rem]" />

          <div className="relative grid items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-12 md:py-20 xl:px-16 xl:py-24">
            <div>
              <p className="eyebrow text-white/60">Indumentaria deportiva</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl">
                Ropa deportiva hecha para rendir
              </h1>
              <p className="mt-5 max-w-md text-white/70 xl:text-lg">
                Encontrá todo lo que necesitás para rendir al máximo, con atención personalizada para
                elegir el producto perfecto según tus objetivos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/productos" className="btn btn-light">
                  Ver catálogo <ArrowRight size={16} />
                </Link>
                <a href="#contacto" className="btn btn-outline border-white/30 hover:border-white hover:bg-white hover:text-ink">Contactanos</a>
              </div>
            </div>

            <div className="hidden justify-center md:flex">
              <Logo className="size-56 ring-1 ring-white/15 xl:size-72" />
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-y-8 py-10 xl:grid-cols-4 xl:divide-x xl:divide-line xl:py-12">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col items-start gap-3 px-2 md:flex-row md:items-center xl:justify-center xl:px-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line">
                <Icon size={19} strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-xs text-mute">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cinta de valores: se duplica la lista para que el loop no tenga cortes */}
      <div className="overflow-hidden bg-ink py-3.5 text-white" aria-label={tape.join(", ")}>
        <div className="marquee flex w-max" aria-hidden="true">
          {[...tape, ...tape, ...tape, ...tape].map((item, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 text-base font-semibold md:text-lg">
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home

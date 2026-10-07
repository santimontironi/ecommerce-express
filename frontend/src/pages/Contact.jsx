import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send, MessageCircle, Instagram, Clock } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin"

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: "+54 341 542 7021", href: "https://wa.me/543415427021" },
  { icon: Instagram, label: "Instagram", value: "@nd.deportes", href: "https://www.instagram.com/nd.deportes/" },
  { icon: Clock, label: "Horario", value: "Lun a Sáb · 9 a 20 hs" },
]

const Contact = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState('')

  const [messageSent, setMessageSent] = useState('');

  const { sendMessage, messageLoading } = useAdmin();

  const onSubmit = async (data) => {
    try {
      const res = await sendMessage(data);
      setMessageSent(res.message);
      reset()
      setErrorMessage('');
    }
    catch (error) {
      setMessageSent('');
      setErrorMessage(error.response?.data?.message || 'No pudimos enviar el mensaje. Probá de nuevo.')
    }
  };


  return (
    <div className="container-page pb-16 md:pb-20 xl:pb-24">

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="section-title">Contactanos</h2>
        <p className="mt-3 text-mute">Estamos para ayudarte. Envianos tu consulta.</p>
      </div>

      <div className="mt-12 grid gap-5 xl:grid-cols-5">

        <div className="flex flex-col justify-between gap-10 rounded-3xl bg-ink p-8 text-white md:p-10 xl:col-span-2">
          <div>
            <h3 className="text-xl font-semibold">Hablemos</h3>
            <p className="mt-2 text-sm text-white/60">Respondemos todas las consultas a la brevedad.</p>
          </div>

          <ul className="flex flex-col gap-5">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-xs text-white/50">{label}</span>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">{value}</a>
                  ) : <span className="font-medium">{value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form className="card flex flex-col gap-5 border-ink/30 p-6 md:p-10 xl:col-span-3" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="field-label">Nombre</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Tu nombre completo"
                aria-invalid={errors.name ? "true" : "false"}
                className="field border-ink/25 focus:border-ink aria-invalid:border-red-500"
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="contact-email" className="field-label">Correo electrónico</label>
              <input
                id="contact-email"
                type="email"
                placeholder="ejemplo@correo.com"
                aria-invalid={errors.email ? "true" : "false"}
                className="field border-ink/25 focus:border-ink aria-invalid:border-red-500"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingrese un correo válido",
                  },
                })}
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="field-label">Mensaje</label>
            <textarea
              id="contact-message"
              rows="5"
              placeholder="Escribí tu mensaje aquí..."
              aria-invalid={errors.message ? "true" : "false"}
              className="field resize-none border-ink/25 focus:border-ink aria-invalid:border-red-500"
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.message && <span className="field-error">{errors.message.message}</span>}
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <button type="submit" disabled={messageLoading} className="btn btn-dark">
              {messageLoading ? "Enviando…" : "Enviar mensaje"}
            </button>

            <p role="status" className={`text-sm ${errorMessage ? "text-red-600" : "text-green-700"}`}>
              {errorMessage || messageSent}
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Contact;

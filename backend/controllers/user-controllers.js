import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendMessage = async function (req, res) {
  try {
    const { name, email, message } = req.body

    await resend.emails.send({
      from: 'Tu Nombre <tu@dominio.com>',
      to: 'destinatario@correo.com',
      subject: 'Nuevo mensaje del formulario',
      html: `<p><b>${name}</b> (${email}) te escribió:</p><p>${message}</p>`,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Error al enviar:', err)
    res.status(500).json({ error: 'Error al enviar el correo' })
  }
}
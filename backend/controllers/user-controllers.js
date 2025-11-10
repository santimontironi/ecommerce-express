import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendMessage = async function (req, res) {
  try {
    const { name, email, message } = req.body

    await resend.emails.send({
      from: 'Nuno Deportes <onboarding@resend.dev>',
      to: 'brunoborlo3@gmail.com',
      reply_to: email,
      subject: 'Nuevo mensaje desde el formulario de contacto',
      html: `
        <div style="
          background-color: #ffffff;
          color: #000000;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          padding: 24px;
          border-radius: 12px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        ">
          <h2 style="
            text-align: center;
            font-weight: 700;
            letter-spacing: 1px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          ">
            🏋️‍♂️ Nuno Deportes
          </h2>

          <p style="font-size: 16px; margin-top: 24px;">
            <b style="font-size: 17px;">Nuevo mensaje del formulario:</b>
          </p>

          <div style="
            background-color: #000;
            color: #fff;
            border-radius: 8px;
            padding: 16px 20px;
            margin-top: 10px;
          ">
            <p><b>Nombre:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p style="margin-top: 12px;"><b>Mensaje:</b></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 28px; text-align: center; font-size: 13px; color: #555;">
            Este mensaje fue enviado automáticamente desde el formulario de contacto de 
            <b>Nuno Deportes</b>.
          </p>
        </div>
      `,
    })

    res.status(200).json({ message: 'Mensaje enviado correctamente' })
  } catch (err) {
    console.error('Error al enviar:', err)
    res.status(500).json({ message: 'Error al enviar el correo' })
  }
}
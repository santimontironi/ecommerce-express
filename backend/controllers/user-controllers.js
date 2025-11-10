import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await sgMail.send({
      to: process.env.SMTP_USER,
      from: "Nuno Deportes <no-reply@tudominio.com>",
      subject: "Nuevo mensaje de contacto - Tienda Online",
      html: `
        <h3>Nuevo mensaje de ${name}</h3>
        <p>Email: ${email}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar:", error);
    res.status(500).json({ message: "No se pudo enviar el mensaje" });
  }
};
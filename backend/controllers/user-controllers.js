import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,   
      port: process.env.SMTP_PORT,     
      secure: process.env.SMTP_PORT == 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nuno Deportes" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: "Nuevo mensaje de contacto - Tienda Online",
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">NUNO DEPORTES</h2>
              <p style="margin: 5px 0 0; font-size: 14px; color: #ddd;">Nuevo mensaje de contacto</p>
            </div>
            <div style="padding: 25px; color: #333;">
              <h3 style="margin-bottom: 10px;">Detalles del mensaje</h3>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
              <p><strong>Mensaje:</strong></p>
              <div style="background-color: #fafafa; border-left: 4px solid #000; padding: 15px; font-style: italic; color: #444;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="background-color: #000; color: #bbb; text-align: center; padding: 15px; font-size: 12px;">
              <p style="margin: 0;">Nuno Deportes - Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar:", error);
    res.status(500).json({ message: "No se pudo enviar el mensaje" });
  }
};
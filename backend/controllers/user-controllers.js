import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false, 
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.SMTP_USER,
            subject: 'Nuevo mensaje de contacto - Tienda Online',
            html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                        <h2 style="color: #2a2a2a;">Nuevo mensaje de consulta recibido.</h2>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong></p>
                        <div style="padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;" />
                        <p style="font-size: 12px; color: #999;">Este mensaje fue enviado desde el formulario de contacto de tu tienda online.</p>
                    </div>
                `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully' });
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message', details: error.message || error });
    }
}
import { Preference, Payment } from 'mercadopago';
import client from '../config/mercadopago.js';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const createPreference = async (req, res) => {
  try {
    const { title, unit_price, quantity, buyer_email, buyer_address, buyer_phone } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title,
            unit_price: Number(unit_price),
            quantity: Number(quantity),
            currency_id: "ARS",
          },
        ],
        payer: {
          email: buyer_email,
          phone: {
            area_code: "",
            number: String(buyer_phone),
          },
          address: {
            street_name: buyer_address,
          },
        },
        back_urls: {
          success: "https://nunodeportes.netlify.app/pay-correct",
          failure: "https://nunodeportes.netlify.app/pay-fail",
          pending: "https://nunodeportes.netlify.app/pay-pending",
        },
        auto_return: "approved",
        notification_url: "https://nunodeportes.vercel.app/webhook",
      },
    });

    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error completo:", error);
    res.status(500).json({
      error: "Error creando preferencia",
      details: error.message || error,
    });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    // Mercado Pago envía el tipo de notificación en query params
    const { type, data } = req.query;

    console.log("Webhook recibido - Type:", type, "Data:", data);

    // Verificar que sea una notificación de pago
    if (type === "payment") {
      const paymentId = data.id;

      // Obtener los detalles completos del pago desde la API de Mercado Pago
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      console.log("Estado del pago:", paymentData.status);

      
      if (paymentData.status === "approved") {
        const buyerEmail = paymentData.payer?.email;
        const buyerName = paymentData.payer?.first_name || paymentData.payer?.name || "Cliente";
        const buyerPhone = paymentData.payer?.phone?.number || "No proporcionado";
        const buyerAddress = paymentData.additional_info?.payer?.address?.street_name || "No proporcionada";
        
        const product = paymentData.additional_info?.items?.[0] || {};
        const productTitle = product.title || "Producto";
        const quantity = product.quantity || 1;
        const totalAmount = paymentData.transaction_amount || 0;

        // Enviar correo al cliente
        await transporter.sendMail({
          from: `"Nuno Deportes" <${process.env.SMTP_USER}>`,
          to: buyerEmail,
          subject: "Confirmación de compra - Nuno Deportes",
          html: `
            <h2>¡Gracias por tu compra, ${buyerName}!</h2>
            <p>Recibimos tu pago correctamente.</p>
            <p>Producto: <strong>${productTitle}</strong></p>
            <p>Cantidad: <strong>${quantity}</strong></p>
            <p>Total abonado: <strong>$${totalAmount} ARS</strong></p>
            <p>Nos pondremos en contacto contigo pronto para coordinar el envío del producto.</p>
            <br>
            <p>Saludos,<br><strong>El equipo de Nuno Deportes</strong></p>
          `,
        });

        console.log(`Correo de confirmación enviado a ${buyerEmail}`);

        // Enviar correo a la tienda con los detalles de la compra
        await transporter.sendMail({
          from: `"Nuno Deportes" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          subject: `🛒 Nueva venta realizada - ${productTitle}`,
          html: `
            <h2>Nueva compra confirmada</h2>
            <p><strong>Nombre:</strong> ${buyerName}</p>
            <p><strong>Email cliente:</strong> ${buyerEmail}</p>
            <p><strong>Teléfono:</strong> ${buyerPhone}</p>
            <p><strong>Dirección:</strong> ${buyerAddress}</p>
            <p><strong>Producto:</strong> ${productTitle}</p>
            <p><strong>Cantidad:</strong> ${quantity}</p>
            <p><strong>Total:</strong> $${totalAmount} ARS</p>
            <hr>
            <p>Verificá el pedido y prepará el envío.</p>
          `,
        });

        console.log(`Notificación de venta enviada al correo de la tienda.`);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook:", error);
    res.sendStatus(200);
  }
};
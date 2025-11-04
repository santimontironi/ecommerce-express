import { Preference } from 'mercadopago';
import client from '../config/mercadopago.js';
import nodemailer from "nodemailer";

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
          success: "https://nice-bluebird.ngrok.io/pay-correct",
          failure: "https://nice-bluebird.ngrok.io/pay-fail",
          pending: "https://nice-bluebird.ngrok.io/pay-pending",
        },
        auto_return: "approved",
        notification_url: "https://nice-bluebird.ngrok.io/webhook",
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
    const payment = req.body;

    console.log("Webhook recibido:", payment);

    
    //verificamos que se trate de un pago aprobado.
    if (payment.action === "payment.created" || payment.action === "payment.updated") {
      const data = payment.data;

      // Configurar el transporte de nodemailer
      if (data && data.status === "approved") {
        const buyerEmail = data.payer?.email;
        const buyerPhone = data.payer?.phone?.number;
        const buyerAddress = data.payer?.address?.street_name;
        const product = data.additional_info?.items?.[0] || {};
        const productTitle = product.title || "Producto";
        const quantity = product.quantity || 1;
        const totalAmount = data.transaction_amount || 0;

        //Enviar correo al cliente
        await transporter.sendMail({
          from: `"Nuno Deportes" <${process.env.SMTP_USER}>`,
          to: buyerEmail,
          subject: "Confirmación de compra - Nuno Deportes",
          html: `
            <h2>¡Gracias por tu compra!</h2>
            <p>Recibimos tu pago correctamente.</p>
            <p>Producto: <strong>${productTitle}</strong></p>
            <p>Cantidad: <strong>${quantity}</strong></p>
            <p>Total abonado: <strong>$${totalAmount}</strong></p>
            <p>Nos pondremos en contacto contigo pronto para coordinar el envío del producto.</p>
            <br>
            <p>Saludos,<br><strong>El equipo de Nuno Deportes</strong></p>
          `,
        });

        console.log(`Correo de confirmación enviado a ${buyerEmail}`);

        await transporter.sendMail({
          from: `"Nuno Deportes" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER, // se envía al correo de la tienda
          subject: `🛒 Nueva venta realizada - ${productTitle}`,
          html: `
            <h2>Nueva compra confirmada</h2>
            <p><strong>Cliente:</strong> ${buyerEmail}</p>
            <p><strong>Teléfono:</strong> ${buyerPhone}</p>
            <p><strong>Dirección:</strong> ${buyerAddress}</p>
            <p><strong>Producto:</strong> ${productTitle}</p>
            <p><strong>Cantidad:</strong> ${quantity}</p>
            <p><strong>Total:</strong> $${totalAmount}</p>
            <hr>
            <p>Verificá el pedido y prepará el envío.</p>
          `,
        });

        console.log(`Notificación de venta enviada al correo de la tienda.`);
      }
    }

    res.sendStatus(200); // Mercado Pago necesita un 200 OK para confirmar recepción
  } catch (error) {
    console.error("Error en webhook:", error);
    res.sendStatus(500);
  }
};
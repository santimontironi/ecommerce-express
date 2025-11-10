import { Preference, Payment } from 'mercadopago';
import client from '../config/mercadopago.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { type, data } = req.query;
    console.log('Webhook recibido - Type:', type, 'Data:', data);

    if (type === 'payment') {
      const paymentId = data.id;
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      console.log('Estado del pago:', paymentData.status);

      if (paymentData.status === 'approved') {
        const buyerEmail = paymentData.payer?.email;
        const buyerName = paymentData.payer?.first_name || paymentData.payer?.name || 'Cliente';
        const buyerPhone = paymentData.payer?.phone?.number || 'No proporcionado';
        const buyerAddress = paymentData.additional_info?.payer?.address?.street_name || 'No proporcionada';
        const product = paymentData.additional_info?.items?.[0] || {};
        const productTitle = product.title || 'Producto';
        const quantity = product.quantity || 1;
        const totalAmount = paymentData.transaction_amount || 0;

        const baseStyle = `
          font-family: 'Arial', sans-serif;
          color: #000;
          background-color: #fff;
          border: 1px solid #000;
          border-radius: 10px;
          padding: 24px;
          max-width: 600px;
          margin: auto;
          line-height: 1.6;
        `;

        await resend.emails.send({
          from: 'Nuno Deportes <onboarding@resend.dev>',
          to: buyerEmail,
          subject: 'Confirmación de compra - Nuno Deportes',
          html: `
            <div style="${baseStyle}">
              <h2 style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 10px;">¡Gracias por tu compra, ${buyerName}!</h2>
              <p>Recibimos tu pago correctamente y estamos procesando tu pedido.</p>
              <div style="margin-top: 20px;">
                <p><strong>Producto:</strong> ${productTitle}</p>
                <p><strong>Cantidad:</strong> ${quantity}</p>
                <p><strong>Total abonado:</strong> $${totalAmount} ARS</p>
              </div>
              <hr style="border: 1px solid #000; margin: 20px 0;">
              <p>Nos pondremos en contacto contigo pronto para coordinar el envío.</p>
              <p style="margin-top: 30px; text-align:center;">🖤 <strong>Nuno Deportes</strong></p>
            </div>
          `,
        });

        console.log(`Correo de confirmación enviado a ${buyerEmail}`);

        // 🏪 Email para la tienda
        await resend.emails.send({
          from: 'Nuno Deportes <onboarding@resend.dev>',
          to: 'brunoborlo3@gmail.com', // o process.env.SMTP_USER si querés mantenerlo dinámico
          subject: `🛒 Nueva venta - ${productTitle}`,
          html: `
            <div style="${baseStyle}">
              <h2 style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 10px;">Nueva compra confirmada</h2>
              <p><strong>Nombre:</strong> ${buyerName}</p>
              <p><strong>Email cliente:</strong> ${buyerEmail}</p>
              <p><strong>Teléfono:</strong> ${buyerPhone}</p>
              <p><strong>Dirección:</strong> ${buyerAddress}</p>
              <p><strong>Producto:</strong> ${productTitle}</p>
              <p><strong>Cantidad:</strong> ${quantity}</p>
              <p><strong>Total:</strong> $${totalAmount} ARS</p>
              <hr style="border: 1px solid #000; margin: 20px 0;">
              <p>Verificá el pedido y prepará el envío.</p>
              <p style="margin-top: 30px; text-align:center;">🖤 <strong>Nuno Deportes</strong></p>
            </div>
          `,
        });

        console.log('Notificación de venta enviada al correo de la tienda.');
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error en webhook:', error);
    res.sendStatus(200);
  }
};
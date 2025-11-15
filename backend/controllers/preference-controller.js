import { Preference, Payment } from 'mercadopago';
import client from '../config/mercadopago.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Objeto temporal para guardar datos de preferencias
// En producción, esto debería estar en una base de datos
const pendingOrders = new Map();

export const createPreference = async (req, res) => {
  try {
    const { title, unit_price, quantity, buyer_email, buyer_address, buyer_phone, buyer_name, buyer_surname } = req.body;

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

    // Guardar datos del comprador asociados al preference_id (DESPUÉS de crear)
    pendingOrders.set(result.id, {
      buyer_name,
      buyer_surname,
      buyer_email,
      buyer_phone,
      buyer_address,
      title,
      unit_price: Number(unit_price),
      quantity: Number(quantity),
      created_at: new Date(),
    });

    console.log(`✅ Preferencia creada: ${result.id} para ${buyer_email}`);

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
    console.log('Query params:', req.query);
    console.log('Body:', req.body);

    let paymentId = null;

    if (req.body.type === 'payment' && req.body.data?.id) {
      paymentId = req.body.data.id;
      console.log('✅ Webhook v1 detectado - Payment ID:', paymentId);
    }
    else if (req.query.topic === 'payment' && req.query.id) {
      paymentId = req.query.id;
      console.log('✅ Webhook v0 detectado - Payment ID:', paymentId);
    }
    else {
      console.log('ℹ️ Webhook ignorado (no es payment o falta ID)');
      return res.sendStatus(200);
    }

    if (paymentId) {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      console.log('Estado del pago:', paymentData.status);
      console.log('Payment data completo:', JSON.stringify(paymentData, null, 2));

      if (paymentData.status === 'approved') {
        // Intentar obtener datos guardados
        const preferenceId = paymentData.external_reference;
        const savedData = pendingOrders.get(preferenceId);

        // Datos del pago (de MercadoPago)
        const buyerEmailFromMP = paymentData.payer?.email;
        const buyerNameFromMP = paymentData.payer?.first_name || paymentData.payer?.name || 'Cliente';
        const productTitle = paymentData.description || 'Producto';
        const totalAmount = paymentData.transaction_amount || 0;

        // Usar datos guardados (del formulario) o fallback de MercadoPago
        const buyerEmail = savedData?.buyer_email || buyerEmailFromMP;
        const quantity = savedData?.quantity || paymentData.additional_info?.items?.[0]?.quantity || 1;
        const buyerPhone = savedData?.buyer_phone
          || paymentData.payer?.phone?.number
          || paymentData.additional_info?.payer?.phone?.number
          || 'No proporcionado';
        const buyerAddress = savedData?.buyer_address
          || paymentData.additional_info?.payer?.address?.street_name
          || paymentData.payer?.address?.street_name
          || 'No proporcionada';
        const buyerName = savedData
          ? `${savedData.buyer_name} ${savedData.buyer_surname}`
          : paymentData.payer?.first_name
          || paymentData.payer?.name
          || 'Cliente';

        console.log('📧 Datos del comprador:');
        console.log('- Email:', buyerEmail);
        console.log('- Teléfono:', buyerPhone);
        console.log('- Dirección:', buyerAddress);

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

        // Email para la tienda
        try {
          await resend.emails.send({
            from: 'Nuno Deportes <onboarding@resend.dev>',
            to: 'brunoborlo3@gmail.com',
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
          console.log('✅ Notificación de venta enviada al correo de la tienda.');
        } catch (emailError) {
          console.error('❌ Error enviando email a la tienda:', emailError);
        }

        // Limpiar datos guardados después de usarlos
        if (savedData) {
          pendingOrders.delete(preferenceId);
          console.log(`🗑️ Datos de preferencia ${preferenceId} eliminados`);
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('❌ Error en webhook:', error);
    res.sendStatus(200);
  }
};
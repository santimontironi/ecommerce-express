import mercadopago from "mercadopago";
import { Resend } from "resend";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Mapa para guardar datos temporales
const pendingOrders = new Map();

/* ======================================================
   1) CREAR PREFERENCIA Y GUARDAR DATOS
====================================================== */
export const createPreference = async (req, res) => {
  try {
    const {
      title,
      unit_price,
      quantity,
      buyer_name,
      buyer_surname,
      buyer_email,
      buyer_phone,
      buyer_address,
    } = req.body;

    // Armar preferencia sin external_reference primero
    const preferenceData = {
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
    };

    // Crear preferencia
    const result = await mercadopago.preferences.create(preferenceData);

    const prefId = result.body.id;

    // Guardar datos antes del pago
    pendingOrders.set(prefId, {
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

    // Ahora sí agregar external_reference
    await mercadopago.preferences.update({
      id: prefId,
      body: {
        external_reference: prefId,
      },
    });

    return res.json({ id: prefId });
  } catch (error) {
    console.error("Error crear preferencia:", error);
    return res.status(500).json({ error: "Error creating preference" });
  }
};

/* ======================================================
   2) WEBHOOK
====================================================== */
export const handleWebhook = async (req, res) => {
  try {
    console.log("Webhook recibido:", req.body);

    if (req.body.type !== "payment") {
      return res.sendStatus(200);
    }

    const paymentId = req.body.data.id;

    const payment = await mercadopago.payment.findById(paymentId);
    const paymentData = payment.body;

    const preferenceId = paymentData.external_reference;

    console.log("external_reference:", preferenceId);

    const savedData = pendingOrders.get(preferenceId);

    if (!savedData) {
      console.log("⚠ No se encontraron datos en pendingOrders.");
      return res.sendStatus(200);
    }

    const {
      buyer_name,
      buyer_surname,
      buyer_email,
      buyer_phone,
      buyer_address,
      title,
      unit_price,
      quantity,
      created_at,
    } = savedData;

    // Datos reales del pago
    const totalPagado = paymentData.transaction_amount;
    const paymentStatus = paymentData.status;
    const paymentDetail = paymentData.status_detail;

    /* ======================================================
       3) ENVIAR EMAIL CON RESEND
    ====================================================== */
    await resend.emails.send({
      from: "Nuño Deportes <onboarding@resend.dev>",
      to: "nunodeportesservicio@gmail.com",
      subject: "Nueva compra confirmada",
      html: `
        <h2>Nueva compra confirmada</h2>

        <h3>Datos del comprador</h3>
        <p><strong>Nombre:</strong> ${buyer_name} ${buyer_surname}</p>
        <p><strong>Email:</strong> ${buyer_email}</p>
        <p><strong>Teléfono:</strong> ${buyer_phone}</p>
        <p><strong>Dirección:</strong> ${buyer_address}</p>

        <h3>Producto</h3>
        <p><strong>Producto:</strong> ${title}</p>
        <p><strong>Cantidad:</strong> ${quantity}</p>
        <p><strong>Precio unitario:</strong> $${unit_price}</p>

        <h3>Pago</h3>
        <p><strong>Total pagado:</strong> $${totalPagado}</p>
        <p><strong>Estado:</strong> ${paymentStatus}</p>
        <p><strong>Detalle:</strong> ${paymentDetail}</p>

        <h3>Información técnica</h3>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Preference ID:</strong> ${preferenceId}</p>
        <p><strong>Fecha de creación:</strong> ${created_at}</p>
      `,
    });

    console.log("📩 Email enviado correctamente.");

    // Eliminar datos del Map
    pendingOrders.delete(preferenceId);

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error webhook:", error);
    return res.sendStatus(200);
  }
};
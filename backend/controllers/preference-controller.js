// controllers/createPreference.js
import { Preference } from 'mercadopago';
import client from '../config/mercadopago.js';

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
            currency_id: 'ARS'
          },
        ],
        payer: {
          email: buyer_email,
          phone: {
            number: buyer_phone
          },
          address: {
            street_name: buyer_address
          }
        },
        back_urls: {
          success: "http://localhost:3000/pay-correct",
          failure: "http://localhost:3000/pay-fail",
          pending: "http://localhost:3000/pay-pending"
        },
        auto_return: 'approved',
        notification_url: "http://localhost:3000/webhook" // Opcional pero recomendado
      }
    });

    res.json({
      id: result.id,
      init_point: result.init_point, // URL del checkout
      sandbox_init_point: result.sandbox_init_point // URL de prueba
    });

  } catch (error) {
    console.error("Error completo:", error);
    res.status(500).json({
      error: "Error creando preferencia",
      details: error.message
    });
  }
}
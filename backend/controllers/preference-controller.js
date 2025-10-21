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
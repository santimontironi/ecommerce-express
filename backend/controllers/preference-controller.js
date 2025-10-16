import mercadopago from "../config/mercadopago";

export default async function createPreference(req, res){
  const { title, unit_price, quantity, buyer_email, buyer_address } = req.body;

  const preference = {
    items: [
      { title, unit_price: Number(unit_price), quantity: Number(quantity) },
    ],
    payer: {
      email: buyer_email,
      address: { street_name: buyer_address } // así cumple con el formato esperado por MP
    },
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
    },
    auto_return: 'approved',
    notification_url: 'http://localhost:4000/webhook', // webhook para recibir notificaciones
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (err) {
    res.status(500).json({message: 'Error creando preferencia', err: err.message});
  }
};
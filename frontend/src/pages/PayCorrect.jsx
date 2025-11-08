import { CheckCircle } from 'lucide-react'

const PayCorrect = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
       
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pago Realizado con Éxito!
        </h1>

        <p className="text-gray-600 mb-2 leading-relaxed">
          Gracias por tu compra. Hemos recibido tu pago correctamente.
        </p>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Estaremos en contacto contigo pronto para coordinar la entrega de tu producto.
        </p>

        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-bold text-blue-800">
            Nos pondremos en contacto con usted mediante un correo electrónico o WhatsApp con los detalles de su pedido.
          </p>
        </div>

      </div>
    </div>
  )
}

export default PayCorrect
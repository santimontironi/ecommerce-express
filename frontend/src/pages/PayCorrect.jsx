import { CheckCircle } from 'lucide-react'
import StatusPage from '../components/StatusPage'

const PayCorrect = () => {
  return (
    <StatusPage icon={CheckCircle} tone="bg-green-50 text-green-600" title="¡Gracias por tu compra!">
      <p>Recibimos tu pago correctamente.</p>
      <p>
        Nos pondremos en contacto con vos por correo electrónico o WhatsApp con los detalles de tu pedido
        para coordinar la entrega.
      </p>
    </StatusPage>
  )
}

export default PayCorrect

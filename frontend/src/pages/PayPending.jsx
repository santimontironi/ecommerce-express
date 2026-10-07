import { Clock } from 'lucide-react'
import StatusPage from '../components/StatusPage'

const PayPending = () => {
  return (
    <StatusPage icon={Clock} tone="bg-amber-50 text-amber-600" title="Estamos esperando tu pago">
      <p>Tu pago todavía se está procesando. Apenas se acredite te vamos a contactar con los detalles de tu pedido.</p>
    </StatusPage>
  )
}

export default PayPending

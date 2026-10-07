import { XCircle } from 'lucide-react'
import StatusPage from '../components/StatusPage'

const PayFail = () => {
  return (
    <StatusPage icon={XCircle} tone="bg-red-50 text-red-600" title="No pudimos procesar el pago">
      <p>Podés intentarlo de nuevo con otro medio de pago o escribirnos por WhatsApp y te ayudamos.</p>
    </StatusPage>
  )
}

export default PayFail

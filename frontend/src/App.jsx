import { BrowserRouter, Route, Routes } from "react-router-dom";
import PayCorrect from "./pages/PayCorrect";
import PayFail from "./pages/PayFail";
import PayPending from "./pages/PayPending";
import Products from "./pages/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/pay-correct" element={<PayCorrect />} />
        <Route path="/pay-pending" element={<PayPending />} />
        <Route path="/pay-fail" element={<PayFail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
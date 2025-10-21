import { BrowserRouter, Route, Routes } from "react-router-dom";
import PayCorrect from "./pages/PayCorrect";
import PayFail from "./pages/PayFail";
import PayPending from "./pages/PayPending";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Layout from "../layout/Layout";
import AdminLogin from "./pages/AdminLogin";
import { ProductProvider } from "../context/getProductContext";
import { AllProductsProvider } from "../context/getAllProducts";
import { AdminProvider } from "../context/adminContext";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />

        <Route
          path="/productos"
          element={<AllProductsProvider>
            <Products />
          </AllProductsProvider>} />

        <Route path="/pay-correct" element={<PayCorrect />} />
        <Route path="/pay-pending" element={<PayPending />} />
        <Route path="/pay-fail" element={<PayFail />} />

        <Route
          path="/checkout/:id"
          element={
            <ProductProvider>
              <Checkout />
            </ProductProvider>
          }
        />

        <Route
          path="/admin-login"
          element={
            <AdminProvider>
              <AdminLogin />
            </AdminProvider>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
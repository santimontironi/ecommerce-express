import { BrowserRouter, Route, Routes } from "react-router-dom";
import PayCorrect from "./pages/PayCorrect";
import PayFail from "./pages/PayFail";
import PayPending from "./pages/PayPending";
import Layout from "../layout/Layout";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import ProductsPage from "./pages/ProductsPage";
import Checkout from "./pages/Checkout";
import ProductsAdmin from "./pages/ProductsAdmin";
import { AdminProvider } from "../context/adminContext";
import SecurityRoutes from "./components/SecurityRoutes";
import { AllProductsProvider } from "../context/AllProductsContext";
import { ProductByIdProvider } from "../context/ProductByIdContext";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />} />
          
        <Route path="/pay-correct" element={<PayCorrect />} />
        <Route path="/pay-pending" element={<PayPending />} />
        <Route path="/pay-fail" element={<PayFail />} />


        <Route element={<AdminProvider />}>

          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/admin" element={<SecurityRoutes>
            <Admin />
          </SecurityRoutes>}/>

        
          <Route path="/agregar-producto" element={<SecurityRoutes>
            <AddProduct />
          </SecurityRoutes>}/>
          

          <Route path="/admin-productos" element={<SecurityRoutes>
            <ProductsAdmin />
          </SecurityRoutes>}/>
         
        </Route>

        <Route element={<AllProductsProvider />}>
          <Route path="/productos" element={<ProductsPage />} />
        </Route>

        <Route element={<ProductByIdProvider />}>
          <Route path="/checkout/:id" element={<Checkout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
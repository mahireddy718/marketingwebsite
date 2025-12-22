import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BulkUpload from "./pages/BulkUpload";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Seller from "./pages/Seller";
  import Checkout from "./pages/Checkout";
 import OrderSuccess from "./pages/OrderSuccess";
 import AddAddress from "./pages/AddAddress";
 import SearchResults from "./pages/SearchResults";





//  import Admin from "./pages/Admin";
  import AdminProducts from "./pages/SellerProducts";

import { Toaster } from "react-hot-toast";




export default function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <BrowserRouter>
      <Routes>

        {/* ALL PAGES WITH NAVBAR + CATEGORY BAR */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
         

          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} /> */}
          <Route path="/seller" element={<Seller />} />
           <Route path="/seller/products" element={<AdminProducts />} /> 
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/order-success" element={<OrderSuccess />} />
           <Route path="/add-address" element={<AddAddress />} />
           <Route path="/search" element={<SearchResults />} />



          
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* PAGES WITHOUT NAVBAR */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/upload" element={<BulkUpload />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}



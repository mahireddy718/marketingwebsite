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
import SkinAnalyzer from "./pages/SkinAnalyzer";
import RoutineBuilder from "./pages/RoutineBuilder";
import IngredientChecker from "./pages/IngredientChecker";

import ProfilePage from "./pages/ProfilePage";
import CouponsPage from "./pages/CouponsPage";
import SupercoinPage from "./pages/SupercoinPage";
import WalletPage from "./pages/WalletPage";
import SavedAddresses from "./pages/SavedAddresses";
import EditAddress from "./pages/EditAddress";
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductEditor from "./pages/admin/ProductEditor";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMarketing from "./pages/admin/AdminMarketing";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";

import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: "#111111",
            color: "#FFFFFF",
            padding: "16px 24px",
            borderRadius: "16px",
            border: "1px solid rgba(201,168,76,0.3)",
            fontFamily: "'Jost', sans-serif",
            fontSize: "13px",
            letterSpacing: "0.05em",
            fontWeight: "500",
            textTransform: "uppercase",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          },
          success: {
            iconTheme: {
              primary: "#C9A84C",
              secondary: "#111111",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#111111",
            },
            style: {
               border: "1px solid rgba(239,68,68,0.2)",
            }
          }
        }}
      />
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<ProductEditor />} />
              <Route path="products/edit/:id" element={<ProductEditor />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="coupons" element={<AdminMarketing />} />
              <Route path="promotions" element={<AdminMarketing />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="upload" element={<BulkUpload />} />
            </Route>

            {/* ALL PAGES WITH NAVBAR + CATEGORY BAR */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
             
              <Route path="/seller" element={<Seller />} />
              <Route path="/seller/products" element={<AdminProducts />} /> 
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/add-address" element={<AddAddress />} />
               <Route path="/search" element={<SearchResults />} />
               <Route path="/skin-analyzer" element={<SkinAnalyzer />} />
               <Route path="/routine-builder" element={<RoutineBuilder />} />
               <Route path="/ingredient-checker" element={<IngredientChecker />} />
              
              <Route path="/cart" element={<CartPage />} />

              {/* User Profile Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/coupons" element={<CouponsPage />} />
              <Route path="/supercoin" element={<SupercoinPage />} />
              <Route path="/cards" element={<WalletPage />} />
              <Route path="/addresses" element={<SavedAddresses />} />
              <Route path="/edit-address/:id" element={<EditAddress />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/gift-cards" element={<WalletPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            {/* PAGES WITHOUT NAVBAR */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </>
  );
}

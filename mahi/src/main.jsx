import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="936217042820-5an0m075a4q2pd2eahidts74qmal211m.apps.googleusercontent.com">
    <CartProvider>
      <App />
    </CartProvider>
  </GoogleOAuthProvider>
);

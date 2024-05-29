// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './authentication-component/Login';
import Login from './auth-component/Login';
import Navbar from './navbar/Navbar';
import Signup from './auth-component/Signup';
import ProductList from './product-component/ProductList';
import Cart from './product-component/Cart';
import { CartProvider } from './product-component/CartContent'; // Import CartProvider
import CheckoutPage from './payment-component/CheckoutPage';
import AdminOrders from './admin/AdminOrders';
import OrderDetails from './admin/OrderDetails';
import AdminProductsPage from './admin/AdminProductsPage';
import ProductDetails from './product-component/ProductDetails';
import OrderStatus from './product-component/OrderStatus';
import OrderConfirmation from './payment-component/ConfirmationPage';


function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={< CheckoutPage/>} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/order/status" element={<OrderStatus />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmationPage.css';

function OrderConfirmation() {
  return (
    <div className="order-confirmation">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/">
        <button className="return-to-shop-button">Return to Shop</button>
      </Link>
    </div>
  );
}

export default OrderConfirmation;
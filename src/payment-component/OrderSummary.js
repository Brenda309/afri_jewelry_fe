// src/components/OrderSummary.js
import React from 'react';

function OrderSummary({ items }) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.product.name}: ${item.product.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default OrderSummary;

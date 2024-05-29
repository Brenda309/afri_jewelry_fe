// src/components/ShippingInfo.js
import React from 'react';
import './ShippingInfo.css';

function ShippingInfo({ onChange, values }) {
  return (
    <div className="shipping-info form-section">
      <h2>Shipping Information</h2>
      <div className="input-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={values.address}
          onChange={onChange}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={values.city}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="postalCode">Postal Code:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={values.postalCode}
          onChange={onChange}
        />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={values.country}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ShippingInfo;

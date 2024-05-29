// src/components/CustomerInfo.js
import React from 'react';
import './CustomerInfo.css';

function CustomerInfo({ onChange, values }) {
  return (
    <div className="customer-info form-section">
      <h2>Customer Information</h2>
      <div className="input-group">
        <label htmlFor="name">First Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={values.lastName || ''}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default CustomerInfo;

// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import '../admin/Admin.css';

function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdate({ ...statusUpdate, [orderId]: newStatus });
  };

  const updateOrderStatus = async (orderId) => {
    const newStatus = statusUpdate[orderId];
    if (!newStatus) return;
    
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(order => (order.id === orderId ? response.data : order)));
      setStatusUpdate({ ...statusUpdate, [orderId]: '' });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-page">
      <h2>Order Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.id}>
              {order.items.map(item => (
                <tr key={item.id}>
                  <td>{order.customerName} {order.customerLastName}</td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      value={statusUpdate[order.id] || order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                    <button onClick={() => updateOrderStatus(order.id)}>Update</button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderStatus;

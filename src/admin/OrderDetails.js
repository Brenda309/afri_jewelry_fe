// // src/components/OrderDetails.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const OrderDetails = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
//                 setOrder(response.data);
//             } catch (error) {
//                 console.error('Error fetching order details', error);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     if (!order) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Order Details</h2>
//             <p><strong>Customer Name:</strong> {order.customerName} {order.customerLastName}</p>
//             <p><strong>Email:</strong> {order.email}</p>
//             <p><strong>Address:</strong> {order.address}, {order.city}, {order.postalCode}, {order.country}</p>
//             <p><strong>Status:</strong> {order.status}</p>
//             <h3>Items</h3>
//             <ul>
//                 {order.items.map(item => (
//                     <li key={item.id}>
//                         <p><strong>Product:</strong> {item.product.name}</p>
//                         <p><strong>Price:</strong> ${item.product.price}</p>
//                         <p><strong>Quantity:</strong> {item.quantity}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderDetails;

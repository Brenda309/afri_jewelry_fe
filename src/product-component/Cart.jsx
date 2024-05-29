import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from './CartContent';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [setCartItems]);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (id, delta) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );

    const updatedItem = updatedCartItems.find((item) => item.id === id);
    if (updatedItem.quantity <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCartItems(updatedCartItems);
      try {
        await axios.put(`http://localhost:8080/api/cart/${id}`, {
          ...updatedItem,
          quantity: updatedItem.quantity,
        });
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2>Cart</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td><img src={item.product.imageUrl} alt={item.product.name} style={styles.image} /></td>
              <td>{item.product.name}</td>
              <td>${item.product.price}</td>
              <td>
                <div style={styles.quantityContainer}>
                  <button onClick={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>+</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => navigate('/checkout')} style={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  image: {
    width: '50px',
    height: '50px'
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityButton: {
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  checkoutButton: {
    padding: '1rem 2rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
};

export default Cart;

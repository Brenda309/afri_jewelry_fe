import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../product-component/CartContent';
import africa from './africa.png'; // Adjust the path to your logo image

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={africa} alt="African Jewelry Logo" className="logo-image" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cartCount}</span>
        </Link>
        <Link to="/login" className="user-icon">
          <i className="fas fa-user"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

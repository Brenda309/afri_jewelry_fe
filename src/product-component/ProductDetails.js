// src/ProductDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (product) => {
    await axios.post('http://localhost:8080/api/cart', {
      product,
      quantity: 1
    });
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = async (product) => {
    // Implement the API call to add to wishlist here
    alert(`${product.name} added to wishlist!`);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={handleGoBack} style={styles.backButton}> View related arts</button>
      <div style={styles.detailsContainer}>
        <img src={product.imageUrl} alt={product.name} style={styles.image} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Size:</strong> 15x20 inches</p>
        <p><strong>Shipping Information:</strong> Free shipping worldwide</p>
        <p><strong>Ratings:</strong> ★★★★☆ (4/5)</p>
        <div style={styles.iconContainer}>
          <i
            className="fas fa-cart-plus"
            onClick={() => handleAddToCart(product)}
            style={styles.icon}
            title="Add to Cart"
          ></i>
          <i
            className="fas fa-heart"
            onClick={() => handleAddToWishlist(product)}
            style={styles.icon}
            title="Add to Wishlist"
          ></i>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  backButton: {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#A38F85',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  detailsContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  icon: {
    fontSize: '1.5rem',
    color: '#D4B2A7',
    cursor: 'pointer',
    margin: '0 1rem'
  }
};

export default ProductDetails;

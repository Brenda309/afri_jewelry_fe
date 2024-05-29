// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Discover the Beauty of African Art</h1>
        <p>
          African art is a diverse and vibrant expression of the rich cultural heritage of the continent.
        </p>
      </header>
      <h2>Arts</h2>
      <div style={styles.cardContainer}>
        {currentProducts.map(product => (
          <div key={product.id} style={styles.card}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} style={styles.image} />
            </Link>
            <div style={styles.cardContent}>
              <h6>{product.name}</h6>
              <p>${product.price}</p>
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
        ))}
      </div>
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={styles.pageButton}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    width: '250px',
    height: '300px', // Set a fixed height
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s'
  },
  cardContent: {
    marginTop: '1rem',
    height: '100px', // Adjust the content height accordingly
    overflow: 'hidden' // Hide overflow if content exceeds height
  },
  image: {
    width: '200px',
    height: '150px',
    borderRadius: '8px 8px 0 0'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem'
  },
  icon: {
    fontSize: '1.5rem',
    color: '#D4B2A7',
    cursor: 'pointer'
  },
  pagination: {
    marginTop: '2rem'
  },
  pageButton: {
    margin: '0 0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#A38F85',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ProductList;

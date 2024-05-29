import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/products');
    setProducts(response.data);
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:8080/api/products', newProduct);
    fetchProducts();
  };

  const handleUpdateProduct = async (id) => {
    await axios.put(`http://localhost:8080/api/products/${id}`, editingProduct);
    fetchProducts();
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Product Management</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddProduct} style={styles.button}>Add Product</button>
      </div>
      <div style={styles.tableContainer}>
        <h2 style={styles.subHeading}>Products</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Image URL</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={styles.tr}>
                {editingProduct && editingProduct.id === product.id ? (
                  <>
                    <td style={styles.td}>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <input
                        type="text"
                        value={editingProduct.imageUrl}
                        onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                        style={styles.input}
                      />
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleUpdateProduct(product.id)} style={styles.button}>Save</button>
                      <button onClick={() => setEditingProduct(null)} style={styles.button}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{product.name}</td>
                    <td style={styles.td}>{product.price}</td>
                    <td style={styles.td}>{product.description}</td>
                    <td style={styles.td}>{product.imageUrl}</td>
                    <td style={styles.td}>
                      <button onClick={() => setEditingProduct(product)} style={styles.button}>Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)} style={styles.button}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
//   container: {
//     padding: '20px',
//   },
//   heading: {
//     textAlign: 'center',
//   },
//   formContainer: {
//     marginBottom: '20px',
//   },
//   subHeading: {
//     marginBottom: '10px',
//   },
//   input: {
//     display: 'block',
//     marginBottom: '10px',
//     padding: '10px',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   button: {
//     padding: '10px 20px',
//     margin: '5px',
//     cursor: 'pointer',
//   },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  tr: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default AdminProductManagement;

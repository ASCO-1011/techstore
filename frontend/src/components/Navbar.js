// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TechStore <i className="fas fa-laptop"></i>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-links">
              Adicionar Produto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// frontend/src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const getCategoryImage = (category) => {
    const images = {
      celular: '/images/celular.jpg',
      notebook: '/images/notebook.jpg',
      switch: '/images/switch.jpg',
      ap: '/images/ap.jpg',
      impressora: '/images/impressora.jpg'
    };
    return images[category] || '/images/default.jpg';
  };

  const filteredProducts = filter === 'todos' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="product-list">
      <h1>Gerenciamento de Produtos</h1>
      
      <div className="filter-container">
        <label>Filtrar por categoria: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="celular">Celulares</option>
          <option value="notebook">Notebooks</option>
          <option value="switch">Switches</option>
          <option value="ap">Access Points</option>
          <option value="impressora">Impressoras</option>
        </select>
      </div>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img 
                    src={getCategoryImage(product.category)} 
                    alt={product.name} 
                  />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">R$ {product.price.toFixed(2)}</p>
                  <p>Estoque: {product.stock} unidades</p>
                  <p>Categoria: {product.category}</p>
                  <div className="product-actions">
                    <Link to={`/edit/${product._id}`} className="btn btn-edit">
                      Editar
                    </Link>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => deleteProduct(product._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;

// frontend/src/components/ProductForm.js
import React from 'react';

const ProductForm = ({ product, setProduct, handleSubmit, buttonText }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome do Produto*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição*</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="price">Preço (R$)*</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Quantidade em Estoque*</label>
        <input
          type="number"
          id="stock"
          name="stock"
          min="0"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria*</label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="celular">Celular</option>
          <option value="notebook">Notebook</option>
          <option value="switch">Switch</option>
          <option value="ap">Access Point</option>
          <option value="impressora">Impressora</option>
        </select>
      </div>

      <button type="submit" className="btn btn-submit">
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;

// frontend/src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/products', product);
      navigate('/');
    } catch (err) {
      setError('Erro ao cadastrar produto. Verifique todos os campos.');
      console.error('Erro:', err.response?.data || err.message);
    }
  };

  return (
    <div className="add-product">
      <h2>Adicionar Novo Produto</h2>
      {error && <div className="error-message">{error}</div>}
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        buttonText="Cadastrar Produto"
      />
    </div>
  );
};

export default AddProduct;

// frontend/src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produto');
        setLoading(false);
        console.error('Erro:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate('/');
    } catch (err) {
      setError('Erro ao atualizar produto');
      console.error('Erro:', err.response?.data || err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="edit-product">
      <h2>Editar Produto</h2>
      {error && <div className="error-message">{error}</div>}
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        buttonText="Atualizar Produto"
      />
    </div>
  );
};

export default EditProduct;

// frontend/src/App.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Navbar */
.navbar {
  background-color: #007bff;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.navbar-logo {
  color: #fff;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.navbar-logo i {
  margin-left: 10px;
}

.nav-menu {
  display: flex;
  list-style: none;
}

.nav-item {
  margin-right: 20px;
}

.nav-links {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* ProductList */
.product-list h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.filter-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-container label {
  margin-right: 10px;
  font-weight: bold;
}

.filter-container select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 20px;
}

.product-details h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.product-details p {
  margin-bottom: 8px;
  color: #555;
}

.product-details .price {
  font-weight: bold;
  color: #007bff;
  font-size: 1.2rem;
}

.product-actions {
  display: flex;
  margin-top: 15px;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  border: none;
  text-align: center;
  transition: background-color 0.3s;
}

.btn-edit {
  background-color: #ffc107;
  color: #333;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.btn-submit {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
}

.btn:hover {
  opacity: 0.9;
}

/* Forms */
.add-product,
.edit-product {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-product h2,
.edit-product h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

// frontend/package.json
{
  "name": "techstore-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/techstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Erro na conexão com MongoDB:', err));

// Rotas
app.use('/api/products', productRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API da TechStore está rodando');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do produto é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A descrição do produto é obrigatória'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'O preço do produto é obrigatório'],
    min: [0, 'O preço não pode ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'A quantidade em estoque é obrigatória'],
    min: [0, 'A quantidade em estoque não pode ser negativa'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'A categoria do produto é obrigatória'],
    enum: ['celular', 'notebook', 'switch', 'ap', 'impressora']
  },
  imageUrl: {
    type: String,
    default: 'default-product.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);

// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter um produto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo produto
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    imageUrl: req.body.imageUrl
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.deleteOne();
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// backend/package.json
{
  "name": "techstore-backend",
  "version": "1.0.0",
  "description": "Back-end do sistema de gerenciamento de produtos da TechStore",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^7.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080; 

const productManager = new ProductManager('productos.json');

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();


  products = products.sort((a, b) => a.id - b.id);

  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readProductsFromFile();
    this.ensureProductsCount();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  ensureProductsCount() {
   
    while (this.products.length < 10) {
      const newProduct = {
        title: `Producto de prueba ${this.products.length + 1}`,
        description: `Descripción del producto de prueba ${this.products.length + 1}`,
        price: Math.floor(Math.random() * 100) + 1,
        thumbnail: `imagen${this.products.length + 1}.jpg`,
        code: `CODE${this.products.length + 1}`,
        stock: Math.floor(Math.random() * 50) + 1,
      };
      this.addProduct(newProduct);
    }
  }

  addProduct(product) {
    const productId = this.products.length + 1;
    const productWithId = { id: productId, ...product };
    this.products.push(productWithId);
    this.saveProductsToFile();
    return productWithId;
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedFields) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProductsToFile();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProductsToFile();
      return deletedProduct;
    }
    return null;
  }
}

module.exports = ProductManager;

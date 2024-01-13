const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readProductsFromFile();
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

const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'ABC123',
  stock: 25,
});

productManager.addProduct({
  title: 'producto prueba2',
  description: 'Este es un producto prueba2',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'XYZ456',
  stock: 25,
});

console.log('Productos:', productManager.getProducts());

const productIdToUpdate = 1;
const updatedProduct = productManager.updateProduct(productIdToUpdate, {
  description: 'Nueva descripción del producto 1',
  price: 200,
});

console.log('Producto actualizado:', updatedProduct);

const productIdToDelete = 2;
const deletedProduct = productManager.deleteProduct(productIdToDelete);

console.log('Producto eliminado:', deletedProduct);

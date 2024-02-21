const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Asegúrate de que el campo 'id' sea único.
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, default: "Sin imagen" }, // Proporciona un valor por defecto para 'thumbnail'.
  code: { type: String, required: true },
  stock: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);

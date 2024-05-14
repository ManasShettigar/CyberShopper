const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{ type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
rating: {
  rate: { type: Number, required: true },
  count: { type: Number, required: true }
},
});

const Product = mongoose.model('Product', productSchema,'fakestoredata');

module.exports = Product;
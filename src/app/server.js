const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
});
const cartProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  quantity:{type:Number,required:true},
});

const app = express();
app.use(express.json());
app.use(cors());
// console.log(process.env.mongoAPIuri);
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(
    process.env.mongoAPIuri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Product model
const Product = mongoose.model("Product", productSchema, "fakestoredata");
const CartProduct = mongoose.model("CartProduct", cartProductSchema, "fakestoredataCart");

//CURD PRODUCTS DISPLAY
// API endpoints
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/products", async (req, res) => {
  try {
    console.log("starting to save");
    // console.log(req.body[0]);
    
    const product = new Product(req.body[0]);
    // await product.validate();

    console.log(product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    // console.log(req.params.id)
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    // console.log(req.params.id)
    console.error('Error retrieving product:', error);
    res.send(false);
    res.status(500).send(error);
  }
});

app.put("/products/update/:id", async (req, res) => {
  // console.log(req.body)

  try {
    console.log(req.body[0])
    const product = await Product.findByIdAndUpdate(req.params.id, req.body[0], {
      new: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
// ADD TO CART 
app.get("/addtocart", async (req, res) => {
  try {
    const products = await CartProduct.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/addtocart", async (req, res) => {
  try {
    console.log("starting to save");
    console.log(req.body);
    
    const product = new CartProduct(req.body);
    // await product.validate();

    console.log(product);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});
app.delete("/addtocart/:id", async (req, res) => {
  try {
    const product = await CartProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/addtocartProduct/:id", async (req, res) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });
    // console.log(req.params.id)
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    // console.log(req.params.id)
    console.error('Error retrieving product:', error);
    res.status(500).send(error);
  }
});
app.patch("/addtocart/updateinc/:id", async (req, res) => {
  // console.log(req.body)

  try {
    // console.log(req.body)
    const product = await CartProduct.updateOne({"id":req.params.id},{ $inc: { "quantity": 1 } }
    , {
      new: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});
app.patch("/addtocart/updatecounter/:id", async (req, res) => {
  // console.log(req.body.product)

  try {
    // const productExist = await CartProduct.findOne({ id: req.params.id });
    if (!await CartProduct.findOne({ id: req.params.id })) {
      const product = new CartProduct(req.body.product);
      await product.save();
    }
    // console.log(req.body)
    const product = await CartProduct.updateOne({"id":req.params.id},{ $inc: { "quantity": req.body.counter } }
    , {
      new: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});
app.patch("/addtocart/updatedec/:id", async (req, res) => {
  // console.log(req.body)

  try {
    // console.log(req.body)
    const product = await CartProduct.updateOne({"id":req.params.id},{ $inc: { "quantity": -1 } }
    , {
      new: true,
     
    });
    // console.log("dec")
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

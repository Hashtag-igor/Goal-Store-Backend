// src/controller/ProductController.js
import Product from "../models/Product.js";

async function getProducts(req, res) {
  const products = await Product.find();
  return res.json(products);
}

async function createProduct(req, res) {
  const product = req.body;
  const newProduct = await Product.create(product);
  return res.json(newProduct);
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  await Product.findByIdAndDelete({ _id: id });
  return res.status(200).json({ res: "Product was deleted" });
}

async function searchProducts(req, res) {
  const searchTerm = req.query.q;
  const products = await Product.find({
    // Use a expressão regular apenas para buscar no campo 'name'
    name: { $regex: searchTerm, $options: "i" },
  });
  return res.json(products);
}

export { getProducts, createProduct, deleteProduct, searchProducts };

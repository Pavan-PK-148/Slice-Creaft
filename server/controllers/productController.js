import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Register a new pizza configuration baseline model + write asset upload
// @route   POST /api/admin/products
export const createProductTemplate = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing parameters. Name and price are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please supply an accompanying image file binary." });
    }

    const localAssetUrl = `/uploads/${req.file.filename}`;

    const newProduct = await Product.create({
      name,
      price: Number(price),
      description: description || '',
      image: localAssetUrl
    });

    res.status(201).json({
      success: true,
      message: "Configuration node written securely to persistent cluster database!",
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ message: "Database transaction failure.", error: error.message });
  }
};

// @desc    Fetch all menu models (Admin + Customer standard)
// @route   GET /api/admin/products
export const getProductTemplates = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to gather database cluster documents.", error: error.message });
  }
};

// @desc    Delete a product template configuration & purge file allocation
// @route   DELETE /api/admin/products/:id
export const deleteProductTemplate = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product document target not located." });
    }

    // Attempt to safely un-link binary asset file off physical device drives
    const systemAssetPath = path.join(__dirname, '..', product.image);
    if (fs.existsSync(systemAssetPath)) {
      fs.unlinkSync(systemAssetPath);
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Configuration wiped successfully." });
  } catch (error) {
    res.status(500).json({ message: "Purge process intercepted an exception error.", error: error.message });
  }
};
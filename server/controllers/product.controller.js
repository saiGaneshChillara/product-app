import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            success: true,
            data: products,
        });
    } catch (err) {
        console.error("Error: ", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product ||!product.name ||!product.price ||!product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (err) {
        console.error("Error: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID",
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (err) {
        console.error("Error: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        return res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        console.error("Error: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
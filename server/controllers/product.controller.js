import Product from "../models/product.model.js";
import {v2 as cloudinary} from 'cloudinary';
import upload from "../middleware/multer.js";

const addProduct = async (req, res) => {
    console.log(req.body);
    try {
        const { name, description, price, category, subCategory, sizes, bestseller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0].path;
        const image2 = req.files.image2 && req.files.image2[0].path;
        const image3 = req.files.image3 && req.files.image3[0].path;
        const image4 = req.files.image4 && req.files.image4[0].path;
        
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item, {
                resource_type: 'image'
            });
            
            return result.secure_url;
        }));

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        const product = new Product(productData);
        await product.save();
        res.json({ success: true, message: 'Product added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        
        res.json({ success: true, products });
    }
    catch (error) {
        res.status(500).json({ message: 'Error listing products', error: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Product removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing product', error: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await Product.findById(productId);
        res.json({ success: true, product });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
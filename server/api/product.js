import Product from '../model/Product.js';

export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
};


export const updateProduct = async (req, res, next) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
};

export const getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
};

export const getAllProduct = async (req, res, next) => {
    const qNew = req.query.new;
    try {
      let products;

      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else {
        products = await Product.find();
      }
      
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  };
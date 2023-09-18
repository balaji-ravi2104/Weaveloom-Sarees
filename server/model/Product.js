import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        desc: { type: String, required: true },
        img: { type: String, required: true },
        color: { type: String },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    origin: { type: String, required: true },
    price: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/marketzen")
.then(async () => {
  console.log("Connected to DB");
  
  // Find products with via.placeholder.com
  const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
    name: String,
    image: String,
  }, { strict: false }));
  
  const products = await Product.find({ image: { $regex: 'via.placeholder.com' } });
  console.log(`Found ${products.length} products with placeholder images.`);
  
  for (const product of products) {
    const newUrl = product.image.replace("via.placeholder.com", "fakeimg.pl");
    product.image = newUrl;
    await product.save();
  }
  
  console.log("Updated products.");
  process.exit(0);
})
.catch(err => {
  console.error("DB Error:", err);
  process.exit(1);
});

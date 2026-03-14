import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products({ search }) {
  const [products, setProducts] = useState([]);

  // Temporary mock data
  const mockProducts = [
    {
      _id: 1,
      name: "MacBook Air M1",
      price: 85000,
      image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-spacegray-select-201810?wid=892&hei=820&fmt=jpeg"
    },
    {
      _id: 2,
      name: "iPhone 14",
      price: 79999,
      image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg"
    },
    {
      _id: 3,
      name: "Sony WH-1000XM5",
      price: 29999,
      image: "https://m.media-amazon.com/images/I/61ZRU9gnbxL._SL1500_.jpg"
    }
  ];

  // search logic
  useEffect(() => {
    if (!search.trim()) {
      setProducts(mockProducts);
    } else {
      const filtered = mockProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

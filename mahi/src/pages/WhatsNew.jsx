import { useEffect, useState } from "react";

export default function WhatsNew() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/collections/whats-new")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  if (products.length === 0) {
    return <h2 className="p-10 text-xl">No new products available</h2>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
      {products.map(product => (
        <div key={product._id} className="p-4 border rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-40 rounded"
          />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

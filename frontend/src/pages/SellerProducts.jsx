import { useState } from "react";
import { API } from "./api";

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const saveProduct = async () => {
    await axios.post("/admin/product", { name, price });
    alert("Product Added");
  };

  return (
    <div className="p-10">
      <h1 className="mb-4 text-2xl font-semibold">Add Product</h1>

      <input 
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border"
      />

      <input 
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 mb-4 border"
      />

      <button onClick={saveProduct} className="px-4 py-2 text-white bg-purple-600 rounded">
        Save
      </button>
    </div>
  );
}
// export default function AdminProducts() {
//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold">Admin Products</h1>
//     </div>
//   );
// }

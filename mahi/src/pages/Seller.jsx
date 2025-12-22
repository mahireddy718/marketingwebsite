export default function Seller() {
  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <a href="/admin/products" className="p-6 bg-white rounded shadow">
          Manage Products
        </a>

        <a href="/admin/categories" className="p-6 bg-white rounded shadow">
          Manage Categories
        </a>

        <a href="/admin/orders" className="p-6 bg-white rounded shadow">
          Manage Orders
        </a>
      </div>
    </div>
  );
}

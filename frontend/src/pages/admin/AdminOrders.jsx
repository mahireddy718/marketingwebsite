import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Truck
} from "lucide-react";
import { API } from "../api.jsx";
import toast from "react-hot-toast";

const StatusBadge = ({ status }) => {
  const styles = {
    PLACED: "bg-blue-50 text-blue-600 border-blue-100",
    PAID: "bg-green-50 text-green-600 border-green-100",
    SHIPPED: "bg-purple-50 text-purple-600 border-purple-100",
    DELIVERED: "bg-teal-50 text-teal-600 border-teal-100",
    CANCELLED: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.PLACED}`}>
      {status}
    </span>
  );
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/api/admin/orders/${id}/status`, { status: newStatus });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(o => 
    o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500">Track and manage customer orders and fulfillment.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by Order ID or Customer Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-600 font-medium w-full md:w-auto justify-center">
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                   <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
                   </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-all">
                    <td className="px-6 py-4 font-mono text-gray-500">
                      #{order._id?.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.user?.name || 'Guest'}</p>
                        <p className="text-xs text-gray-400">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ₹{order.total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <select 
                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
                         value={order.status}
                         className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-pink-500 outline-none"
                       >
                         <option value="PLACED">Placed</option>
                         <option value="PAID">Paid</option>
                         <option value="SHIPPED">Shipped</option>
                         <option value="DELIVERED">Delivered</option>
                         <option value="CANCELLED">Cancelled</option>
                       </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

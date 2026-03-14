import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingBag,
  MoreVertical,
  ShieldCheck,
  UserX
} from "lucide-react";
import { API } from "../api.jsx";
import toast from "react-hot-toast";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get("/api/admin/customers");
        setCustomers(res.data);
      } catch (err) {
        toast.error("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <p className="text-gray-500">View and manage your registered customer base.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
            No customers found.
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div key={customer._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xl group-hover:bg-pink-600 group-hover:text-white transition-all">
                  {customer.name?.charAt(0).toUpperCase()}
                </div>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1">
                    <ShieldCheck size={14} />
                    <span>Verified Account</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Mail size={16} />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>Joined {new Date(customer.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                       <ShoppingBag size={14} />
                     </div>
                     <span className="text-xs font-bold text-gray-700">0 Orders</span>
                   </div>
                   <button className="text-xs font-bold text-pink-600 hover:underline">View Profile</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

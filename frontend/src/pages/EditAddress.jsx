import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../pages/api";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await API.get(`/api/address/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load address details");
        navigate("/addresses");
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!form.fullName) return "Full name required";
    if (!form.phone || form.phone.toString().length !== 10)
      return "Valid 10-digit phone required";
    if (!form.street) return "Street required";
    if (!form.city) return "City required";
    if (!form.state) return "State required";
    if (!form.pincode) return "Pincode required";
    return null;
  };

  const saveAddress = async () => {
    const error = validate();
    if (error) {
      toast(error);
      return;
    }

    setIsSaving(true);
    try {
      await API.put(`/api/address/${id}`, form);
      toast.success("Address updated successfully");
      navigate("/addresses");
    } catch (err) {
      toast.error("Failed to update address");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl px-6 py-12 mx-auto">
      <button 
        onClick={() => navigate("/addresses")}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 font-bold text-sm"
      >
        <ArrowLeft size={16} /> Back to Addresses
      </button>

      <h1 className="mb-8 text-3xl font-bold">Edit Address</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          name="street"
          placeholder="Street Address"
          value={form.street}
          onChange={handleChange}
          className="p-3 border rounded-lg md:col-span-2"
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
      </div>

      <label className="flex items-center gap-3 mt-6">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        <span className="text-sm text-gray-600">
          Set as default delivery address
        </span>
      </label>

      <button
        onClick={saveAddress}
        disabled={isSaving}
        className="w-full py-3 mt-8 text-white bg-black rounded-full hover:bg-gray-800 disabled:opacity-50 font-bold"
      >
        {isSaving ? "Updating..." : "Update Address"}
      </button>
    </div>
  );
}

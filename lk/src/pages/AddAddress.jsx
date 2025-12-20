import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../pages/api";
import toast from "react-hot-toast";

export default function AddAddress() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    return (
      form.fullName &&
      form.phone &&
      form.street &&
      form.city &&
      form.state &&
      form.pincode
    );
  };

  const saveAddress = async () => {
    if (!userId) {
      toast("Login required");
      return;
    }

    if (!validate()) {
      toast("Please fill all fields");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`${API}/user/addresses/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        toast("Failed to save address");
        return;
      }

      toast("Address saved successfully", {
        style: { background: "#111", color: "#fff" },
      });

      navigate("/checkout");
    } catch (err) {
      toast("Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl px-6 py-12 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Add New Address</h1>

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
        className="w-full py-3 mt-8 text-white bg-black rounded-full hover:bg-gray-800 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Address"}
      </button>

      <button
        onClick={() => navigate("/checkout")}
        className="block w-full mt-4 text-sm text-center text-gray-500 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
}

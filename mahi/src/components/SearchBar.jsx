import React, { useState } from "react";
import { API } from "../pages/api.jsx";


export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim() === "") {
      setResults([]);
      return;
    }

    const res = await API.get(`/products/search/${e.target.value}`);
    setResults(res.data);
  };

  return (
    <input
      type="text"
      placeholder="Search for products..."
      className="w-full px-4 py-2 border rounded-full"
      value={query}
      onChange={handleSearch}
    />
  );
}

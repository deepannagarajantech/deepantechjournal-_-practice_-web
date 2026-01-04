import { useState } from "react";
import api from "../api/apiClient";

export default function AdminProductAdd() {
  const [name, setName] = useState("Sample Product");
  const [price, setPrice] = useState("1000");
  const [description, setDescription] = useState("Test description");
  const [stock, setStock] = useState("10");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/products/add", {
        name,
        price,
        description,
        stock,
      });
      setMessage("Saved: " + res.data.id);
    } catch (err) {
      setMessage("Error saving product");
    }
  };

  return (
    <div className="max-w-lg bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add Product (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
        <input className="w-full border rounded px-3 py-2" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price"/>
        <textarea className="w-full border rounded px-3 py-2" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description"/>
        <input className="w-full border rounded px-3 py-2" value={stock} onChange={e=>setStock(e.target.value)} placeholder="Stock"/>
        <button className="bg-slate-900 text-white px-4 py-2 rounded">Save</button>
      </form>
      {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}
    </div>
  );
}

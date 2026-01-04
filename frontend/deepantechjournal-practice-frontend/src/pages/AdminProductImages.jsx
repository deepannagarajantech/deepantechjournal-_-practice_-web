import { useState } from "react";
import api from "../api/apiClient";

export default function AdminProductImages() {
  const [productId, setProductId] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    if (!productId) return;
    const res = await api.get(`/products/${productId}/images`);
    setImages(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !productId) return;
    const fd = new FormData();
    fd.append("file", file);
    await api.post(`/products/${productId}/images`, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    await loadImages();
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-semibold">Product Images (Admin)</h2>
      <div className="flex gap-2 items-center">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Product UUID"
          value={productId}
          onChange={e=>setProductId(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-slate-900 text-white rounded text-sm"
          onClick={loadImages}
        >
          Load
        </button>
      </div>
      <form onSubmit={handleUpload} className="flex gap-2 items-center">
        <input type="file" onChange={e=>setFile(e.target.files[0])}/>
        <button className="px-3 py-2 bg-blue-700 text-white rounded text-sm">
          Upload Image
        </button>
      </form>

      <div className="grid grid-cols-4 gap-3">
        {images.map(img => (
          <div key={img.id} className="border rounded-lg overflow-hidden">
            <img
              src={`http://localhost:8080${img.thumbnailUrl}`}
              alt=""
              className="w-full h-24 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

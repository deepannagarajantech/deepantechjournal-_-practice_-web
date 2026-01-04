import { useState } from "react";
import api from "../api/apiClient";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setResponse(res.data);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">File Upload Playground</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {response && <p className="mt-4 text-sm text-slate-700">{response}</p>}
    </div>
  );
}

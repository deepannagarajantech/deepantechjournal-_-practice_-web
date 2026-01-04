import { useState } from "react";
import api from "../api/apiClient";

export default function AdminExcelUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [downloadId, setDownloadId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await api.post("/products/bulk/upload-xlsx", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setResult(res.data);
    setDownloadId(res.data.errorReportId || null);
  };

  const handleDownload = () => {
    if (!downloadId) return;
    window.open(`http://localhost:8080/api/products/bulk/download/${downloadId}`, "_blank");
  };

  return (
    <div className="max-w-lg bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Bulk Excel Upload (Enterprise)</h2>
      <p className="text-xs text-slate-600 mb-2">
        Expected columns (sheet1): Name, SKU, Variant, Category, Price, Stock
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="file" accept=".xlsx" onChange={e=>setFile(e.target.files[0])}/>
        <button className="bg-blue-700 text-white px-4 py-2 rounded text-sm">
          Upload Excel
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm text-slate-700 space-y-1">
          <p>Success: {result.successCount}</p>
          <p>Errors: {result.errorCount}</p>
          <p>Skipped: {result.skippedCount}</p>
          {downloadId && (
            <button
              className="mt-2 text-xs px-3 py-1 rounded border border-slate-500"
              onClick={handleDownload}
            >
              Download Error Report
            </button>
          )}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import api from "../api/apiClient";

function ProductCard({ product }) {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get(`/products/${product.id}/images`)
      .then(res => setImages(res.data))
      .catch(() => setImages([]));
  }, [product.id]);

  const hasImages = images.length > 0;
  const currentImage = hasImages
    ? `http://localhost:8080${images[index].thumbnailUrl}`
    : null;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      {hasImages ? (
        <div className="relative">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg border"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full px-2 text-xs"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full px-2 text-xs"
              >
                ›
              </button>
            </>
          )}
          <div className="absolute bottom-1 right-2 text-[10px] bg-black/60 text-white px-2 py-[1px] rounded-full">
            {index + 1}/{images.length}
          </div>
        </div>
      ) : (
        <div className="w-full h-40 rounded-lg border border-dashed flex items-center justify-center text-xs text-slate-400">
          No images yet – great for image-related automation tests.
        </div>
      )}

      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="mt-2 font-bold">₹{product.price}</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {products.length === 0 && (
          <p className="text-sm text-slate-500">
            No products yet – add from Admin to test.
          </p>
        )}
      </div>
    </div>
  );
}

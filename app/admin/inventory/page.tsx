"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Product from "@/components/admin/products/page";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("api/products");

      // Check if the array is directly in 'data' or nested in 'data.data'
      const fetchedProducts = Array.isArray(data) ? data : data.data;

      setProducts(fetchedProducts || []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to remove this piece?")) {
      await api.delete(`api/products/${id}`);
      load();
    }
  };

  return (
    <div className=" pt-32 p-10 max-w-6xl mx-auto min-h-screen">
      {/* HEADER SECTION - Button is here! */}
      <div className="z-10 relative flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-stone-100">
            Inventory
          </h1>
          <p className="text-slate-500 dark:text-stone-100">
            Manage your Cozy Corner furniture collection.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          type="button" // Always good practice to add type="button"
          className="relative z-20 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-200 transition-all active:scale-95 cursor-pointer"
        >
          + Add New Product
        </button>
      </div>

      {/* CONTENT SECTION */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Loading your collection...
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {products.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-6 hover:bg-slate-100 dark:hover:bg-stone-700 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={p.image}
                      className="w-16 h-16 object-cover rounded-2xl bg-slate-100"
                      alt=""
                    />
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-stone-100">
                        {p.name}
                      </h3>
                      <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full uppercase">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <p className="font-mono font-bold text-xl text-slate-900">
                      ${p.price}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center">
              <p className="text-slate-400 mb-4">
                Your inventory is currently empty.
              </p>
              <button
                onClick={handleAddNew}
                className="text-amber-600 font-bold underline"
              >
                Click here to add your first product
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL COMPONENT */}
      <Product
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={load}
        editingProduct={editingProduct}
      />
    </div>
  );
}

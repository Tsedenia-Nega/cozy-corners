"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function ProductModal({
  isOpen,
  onClose,
  onRefresh,
  editingProduct,
}: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
   try {
     // 1. Destructure the data to remove fields Prisma hates updating
     // We pull out 'id' and 'createdAt' so they aren't in 'updateData'
     const { id, createdAt, updatedAt, ...updateData } = formData as any;

     if (editingProduct) {
       // 2. Use the ID in the URL, but only send the CLEAN 'updateData' in the body
       await api.put(`api/products/${editingProduct.id}`, updateData);
     } else {
       await api.post("api/products", updateData);
     }

     onRefresh();
     onClose();
   } catch (err: any) {
     console.error("Save failed", err.response?.data || err.message);
     alert(`Error: ${err.response?.data?.message || "Check console"}`);
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800">
            {editingProduct ? "✨ Edit Furniture" : "🛋️ Add New Piece"}
          </h2>
          <p className="text-slate-500 text-sm">
            Fill in the details for your inventory.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Product Name
              </label>
              <input
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Velvet Shell Chair"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none h-24 resize-none"
                placeholder="Describe the materials, style, and comfort..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  In Stock
                </label>
                <input
                  type="number"
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            {/* Category & Image Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full border border-slate-200 p-3 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select...</option>
                  <option value="Living-room">Living-room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="HomeOffice">HomeOffice</option>
                  <option value="Decor">Decor</option>
                  <option value="Dining">Dining</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* FOOTER SECTION - Buttons are here! */}
          <div className="bg-slate-50 px-8 py-6 flex items-center justify-end gap-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-2.5 bg-slate-900 hover:bg-slate-800 text-black font-bold rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingProduct
                  ? "Update Piece"
                  : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

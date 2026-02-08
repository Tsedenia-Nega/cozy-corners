"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { X, Upload, Image as ImageIcon } from "lucide-react";

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
    image: "", // Stores the Base64 string or URL
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

  // Handle File Upload from PC
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size validation (e.g., 2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please choose an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { id, createdAt, updatedAt, ...updateData } = formData as any;

      if (editingProduct) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-stone-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-stone-50 dark:bg-stone-950 px-8 py-6 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif text-stone-800 dark:text-stone-100">
              {editingProduct ? "Edit Furniture Piece" : "Add New Piece"}
            </h2>
            <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">
              Inventory Management
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                Product Name
              </label>
              <input
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-xl focus:ring-1 focus:ring-[#A67C52] outline-none text-stone-900 dark:text-white transition-all"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                Description
              </label>
              <textarea
                className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-xl focus:ring-1 focus:ring-[#A67C52] outline-none h-24 resize-none text-stone-900 dark:text-white"
                placeholder="Describe the materials and style..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-xl focus:ring-1 focus:ring-[#A67C52] outline-none text-stone-900 dark:text-white"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-xl focus:ring-1 focus:ring-[#A67C52] outline-none text-stone-900 dark:text-white"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            {/* Category & Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Category
                </label>
                <select
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-3 rounded-xl focus:ring-1 focus:ring-[#A67C52] outline-none text-stone-900 dark:text-white"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Living-room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="HomeOffice">Home Office</option>
                  <option value="Decor">Decor</option>
                  <option value="Dining">Dining</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                  Product Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="pc-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="pc-upload"
                    className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-600 transition-all text-xs font-bold"
                  >
                    <Upload size={16} />
                    Upload PC
                  </label>

                  {formData.image && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700">
                      <img
                        src={formData.image}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-stone-50 dark:bg-stone-950 px-8 py-6 flex items-center justify-end gap-4 border-t border-stone-100 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-bold transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-stone-900 dark:bg-[#A67C52] text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50 text-sm"
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

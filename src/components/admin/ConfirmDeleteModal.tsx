"use client";

import { Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";

interface ConfirmDeleteModalProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function ConfirmDeleteModal({
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-2xl text-gray-900 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 border border-red-200">
              <Trash2 className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="text-base font-black text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={deleting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 pt-0">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 border border-gray-200 rounded-xl py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-4 rounded shadow max-w-lg w-full">
        <button className="float-right" onClick={onClose}>
          Close
        </button>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

'use client';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...rest }: InputProps) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input {...rest} className={`mt-1 block w-full border rounded px-3 py-2 ${rest.className ?? ''}`} />
    </label>
  );
}

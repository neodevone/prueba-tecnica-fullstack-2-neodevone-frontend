// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Página no encontrada
        </p>
        <p className="text-gray-500 mb-8">
          Lo sentimos, no pudimos encontrar la página que buscas.
        </p>
      </div>

      <Link href="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
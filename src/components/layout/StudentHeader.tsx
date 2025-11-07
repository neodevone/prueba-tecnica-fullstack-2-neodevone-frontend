'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, User, LogOut, Home } from 'lucide-react';

export default function StudentHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout(router); // 🔥 Pasar el router al logout
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Navegación */}
          <div className="flex items-center space-x-8">
            <Link href="/student/dashboard" className="flex items-center group">
              <BookOpen className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                Global Education
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/student/dashboard" 
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Link>
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm bg-primary-50 px-3 py-2 rounded-lg">
              <User className="h-4 w-4 text-primary-600 mr-2" />
              <div>
                <p className="font-medium text-primary-900">{user?.fullName}</p>
                <p className="text-primary-600 text-xs">Estudiante</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              title="Cerrar Sesión"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:block">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
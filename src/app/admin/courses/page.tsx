'use client';

import { useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const { courses, isLoading, error, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el curso "${name}"?`)) {
      try {
        await deleteCourse(id);
      } catch (error) {
        // Error manejado en el hook
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    
    const statusLabels = {
      active: 'Activo',
      inactive: 'Inactivo',
      completed: 'Completado',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cursos</h1>
          <p className="text-gray-600 mt-2">Administra todos los cursos del sistema</p>
        </div>
        <Link href="/admin/courses/new" className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Curso
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="card hover:shadow-lg transition-all duration-200 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{course.name}</h3>
              </div>
              {getStatusBadge(course.status)}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{course.description}</p>
            
            <div className="text-sm text-gray-500 space-y-1 mb-4">
              <div className="flex justify-between">
                <span>Inicia:</span>
                <span className="font-medium">{formatDate(course.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Creado:</span>
                <span>{formatDate(course.createdAt)}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-100">
              <Link 
                href={`/admin/courses/${course._id}`}
                className="btn-secondary flex-1 text-center flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
              <button
                onClick={() => handleDelete(course._id, course.name)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cursos</h3>
          <p className="text-gray-600 mb-4">Comienza creando tu primer curso.</p>
          <Link href="/admin/courses/new" className="btn-primary inline-flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Crear Primer Curso
          </Link>
        </div>
      )}
    </div>
  );
}
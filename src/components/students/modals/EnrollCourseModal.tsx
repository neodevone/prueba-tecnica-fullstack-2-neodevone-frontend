'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { X, BookOpen, Calendar } from 'lucide-react';

interface Course {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  status: string;
}

interface EnrollCourseModalProps {
  courses: Course[];
  onClose: () => void;
  onEnrollSuccess: (courseName: string) => void;
}

export default function EnrollCourseModal({
  courses,
  onClose,
  onEnrollSuccess,
}: EnrollCourseModalProps) {
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    const course = courses.find(c => c._id === courseId);
    setSelectedCourseDetails(course || null);
    setError('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCourseId) {
      setError('Selecciona un curso para continuar');
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user?._id) {
        setError('Error: usuario no identificado');
        return;
      }

      const selectedCourse = courses.find(c => c._id === selectedCourseId);
      
      console.log('Inscribiendo usuario:', user._id, 'en curso:', selectedCourseId);
      
      await api.put(`/api/users/${user._id}`, {
        programId: selectedCourseId,
      });

      onEnrollSuccess(selectedCourse?.name || 'Curso');
    } catch (err: any) {
      console.error('Error al inscribirse:', err);
      setError(err.response?.data?.message || 'Error al inscribirse en el curso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Seleccionar Curso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Lista de Cursos */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Elige el curso que deseas cursar *
            </label>

            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
              {courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => handleCourseSelect(course._id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedCourseId === course._id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-1 mr-3 shrink-0 ${
                        selectedCourseId === course._id
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedCourseId === course._id && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(course.startDate)}
                        </span>
                        <span className="capitalize">{course.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalles del Curso Seleccionado */}
          {selectedCourseDetails && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Resumen de Inscripción
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <span className="font-medium">Curso:</span> {selectedCourseDetails.name}
                </p>
                <p>
                  <span className="font-medium">Fecha de Inicio:</span>{' '}
                  {formatDate(selectedCourseDetails.startDate)}
                </p>
                <p>
                  <span className="font-medium">Estado:</span>{' '}
                  <span className="capitalize">{selectedCourseDetails.status}</span>
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedCourseId}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Inscribiendo...' : 'Confirmar Inscripción'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
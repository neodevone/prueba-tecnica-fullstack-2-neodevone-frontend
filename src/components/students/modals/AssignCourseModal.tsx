'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Course } from '@/types/course';
import { X } from 'lucide-react';

interface AssignCourseModalProps {
  studentId: string;
  studentName: string;
  currentCourseId?: string;
  currentCourseName?: string;
  onClose: () => void;
  onAssignSuccess: () => void;
}

export default function AssignCourseModal({
  studentId,
  studentName,
  currentCourseId,
  currentCourseName,
  onClose,
  onAssignSuccess,
}: AssignCourseModalProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState(currentCourseId || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get<{ data: { items: Course[] } }>('/api/programs');
        setCourses(response.data.data.items);
      } catch (err) {
        setError('Error al cargar cursos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedCourseId) {
      setError('Selecciona un curso');
      return;
    }

    if (selectedCourseId === currentCourseId) {
      setError('El estudiante ya está asignado a este curso');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.put(`/api/users/${studentId}`, {
        programId: selectedCourseId,
      });

      onAssignSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al asignar curso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Asignar Curso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Estudiante: <span className="font-medium text-gray-900">{studentName}</span>
            </p>
            {currentCourseName && (
              <p className="text-sm text-gray-600 mb-4">
                Curso actual: <span className="font-medium text-blue-600">{currentCourseName}</span>
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Curso *
            </label>
            <select
              id="course"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="input-field"
              disabled={isLoading}
              required
            >
              <option value="">-- Selecciona un curso --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {isLoading && (
              <p className="text-sm text-gray-500 mt-1">Cargando cursos...</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, CourseFormData } from '@/types/course';

interface CourseFormProps {
  course?: Course;
  onSubmit: (data: CourseFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export default function CourseForm({ course, onSubmit, isSubmitting = false }: CourseFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>({
    name: course?.name || '',
    description: course?.description || '',
    startDate: course?.startDate ? course.startDate.split('T')[0] : '',
    status: course?.status || 'active',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.name.trim() || !formData.description.trim() || !formData.startDate) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      await onSubmit(formData);
      router.push('/admin/courses');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el curso');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {course ? 'Editar Curso' : 'Nuevo Curso'}
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Curso *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Ej: Programación Web Avanzada"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe el contenido y objetivos del curso..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : (course ? 'Actualizar Curso' : 'Crear Curso')}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/courses')}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
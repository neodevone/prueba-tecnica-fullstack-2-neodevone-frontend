'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudentFormData } from '@/types/student';
import { Course } from '@/types/course';
import { api } from '@/lib/api';

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export default function StudentForm({ onSubmit, isSubmitting = false }: StudentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    email: '',
    password: '',
    programId: '',
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get<{ data: { items: Course[] } }>('/api/programs');
        setCourses(response.data.data.items);
      } catch (err) {
        setError('Error al cargar cursos');
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.programId) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      await onSubmit(formData);
      router.push('/admin/students');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear estudiante');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Estudiante</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              placeholder="Ej: María González"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <div>
            <label htmlFor="programId" className="block text-sm font-medium text-gray-700 mb-2">
              Curso Asignado *
            </label>
            <select
              id="programId"
              name="programId"
              value={formData.programId}
              onChange={handleChange}
              className="input-field"
              required
              disabled={loadingCourses}
            >
              <option value="">Selecciona un curso</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {loadingCourses && (
              <p className="text-sm text-gray-500 mt-1">Cargando cursos...</p>
            )}
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting || loadingCourses}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creando...' : 'Crear Estudiante'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/students')}
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
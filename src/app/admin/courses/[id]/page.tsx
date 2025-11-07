'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseForm from '@/components/forms/CourseForm';
import { useCourses } from '@/hooks/useCourses';
import { Course, CourseFormData } from '@/types/course';
import { api } from '@/lib/api';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { updateCourse, isLoading } = useCourses();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const courseId = params.id as string;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get<{ data: Course }>(`/api/programs/${courseId}`);
        setCourse(response.data.data);
      } catch (err: any) {
        setError('Curso no encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleSubmit = async (data: CourseFormData) => {
    await updateCourse(courseId, data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Cargando curso...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Curso no encontrado'}
          </div>
          <button 
            onClick={() => router.push('/dashboard/courses')}
            className="btn-primary mt-4"
          >
            Volver a Cursos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <CourseForm 
        course={course}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
}
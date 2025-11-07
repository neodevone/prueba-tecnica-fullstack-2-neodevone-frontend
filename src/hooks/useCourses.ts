import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Course, CourseFormData, CourseListResponse } from '@/types/course';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCourses = async (filter = '', page = 1, limit = 10) => {
    setIsLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filter && { filter })
      });
      
      const response = await api.get<{ data: CourseListResponse }>(`/api/programs?${params}`);
      setCourses(response.data.data.items);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar cursos');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createCourse = async (courseData: CourseFormData) => {
    try {
      const response = await api.post<{ data: Course }>('/api/programs', courseData);
      setCourses(prev => [response.data.data, ...prev]);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear curso');
      throw err;
    }
  };

  const updateCourse = async (id: string, courseData: Partial<CourseFormData>) => {
    try {
      const response = await api.put<{ data: Course }>(`/api/programs/${id}`, courseData);
      setCourses(prev => prev.map(course => 
        course._id === id ? response.data.data : course
      ));
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar curso');
      throw err;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await api.delete(`/api/programs/${id}`);
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar curso');
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
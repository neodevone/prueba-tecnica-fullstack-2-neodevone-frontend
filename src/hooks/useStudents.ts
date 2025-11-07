import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Student, StudentFormData } from '@/types/student';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = async (programId = '') => {
    setIsLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (programId) params.append('programId', programId);
      
      const response = await api.get<{ data: { items: Student[] } }>(`/api/users?${params}`);
      setStudents(response.data.data.items);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar estudiantes');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createStudent = async (studentData: StudentFormData) => {
    try {
      const response = await api.post<{ data: Student }>('/api/users', studentData);
      setStudents(prev => [response.data.data, ...prev]);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear estudiante');
      throw err;
    }
  };

  const getStudentById = async (studentId: string) => {
    try {
      const response = await api.get<{ data: Student }>(`/api/users/${studentId}`);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener estudiante');
      throw err;
    }
  };

  const updateStudent = async (studentId: string, updateData: Partial<Student>) => {
    try {
      const response = await api.put<{ data: Student }>(`/api/users/${studentId}`, updateData);
      // Actualizar en el estado local
      setStudents(prev =>
        prev.map(s => s._id === studentId ? response.data.data : s)
      );
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar estudiante');
      throw err;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    isLoading,
    error,
    fetchStudents,
    createStudent,
    getStudentById,
    updateStudent,
  };
}
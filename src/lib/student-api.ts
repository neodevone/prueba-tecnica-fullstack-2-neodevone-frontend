import { api } from './api';

// API calls específicas para estudiantes (sin permisos de admin)
export const studentApi = {
  // Obtener cursos disponibles (públicos)
  getAvailableCourses: async () => {
    const response = await api.get('/api/programs?status=active');
    return response.data;
  },

  // Obtener mis cursos (si el backend los provee)
  getMyCourses: async () => {
    try {
      const response = await api.get('/api/users/me/courses');
      return response.data;
    } catch (error) {
      // Si el endpoint no existe, retornar array vacío
      return { data: { items: [], total: 0 } };
    }
  },

  // Solicitar inscripción a un curso
  requestEnrollment: async (courseId: string) => {
    // En un sistema real, aquí harías POST a /api/enrollments
    // Por ahora simulamos la solicitud
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Solicitud enviada al administrador' });
      }, 1000);
    });
  }
};
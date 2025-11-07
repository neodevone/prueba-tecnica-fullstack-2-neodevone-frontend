'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import EnrollCourseModal from '@/components/students/modals/EnrollCourseModal';
import { BookOpen, Calendar, User, Clock, Award, Search } from 'lucide-react';
import { useState } from 'react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { courses, isLoading: coursesLoading } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleEnrollSuccess = (courseName: string) => {
    setSuccessMessage(`✅ ¡Inscripción completada en: ${courseName}!`);
    setShowModal(false);
    // Recarga la página para obtener el perfil actualizado
    setTimeout(() => window.location.reload(), 1500);
  };

  const isLoading = coursesLoading;
  const isEnrolled = !!user?.programId;

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Bienvenida */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <User className="h-12 w-12 text-primary-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Bienvenido, {user?.fullName}!
              </h1>
              <p className="text-gray-600 mt-1">
                {isEnrolled ? 'Continúa con tus estudios' : 'Selecciona un curso para comenzar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center bg-blue-50 border-blue-200">
          <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-900">{courses.length}</h3>
          <p className="text-blue-700 font-medium">Cursos Disponibles</p>
        </div>

        <div className="card text-center bg-green-50 border-green-200">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-900">{isEnrolled ? '1' : '0'}</h3>
          <p className="text-green-700 font-medium">Cursos Activos</p>
        </div>

        <div className="card text-center bg-purple-50 border-purple-200">
          <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-purple-900">
            {isEnrolled ? 'En Progreso' : 'No iniciado'}
          </h3>
          <p className="text-purple-700 font-medium">Tu Estado</p>
        </div>
      </div>

      {/* Tarjeta de Estado de Inscripción */}
      <div className="mb-8">
        {isEnrolled && user?.programId ? (
          <div className="card bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Curso Actual</h3>
                  <p className="text-green-800 font-semibold text-lg mt-2">
                    {typeof user.programId === 'object' ? user.programId.name : 'Curso asignado'}
                  </p>
                  {typeof user.programId === 'object' && (
                    <>
                      <p className="text-green-700 text-sm mt-1">
                        {user.programId.description}
                      </p>
                      <div className="text-sm text-green-600 mt-3 space-y-1">
                        <p>
                          📅 <span className="font-medium">Inicia:</span> {formatDate(user.programId.startDate)}
                        </p>
                        <p>
                          📊 <span className="font-medium">Estado:</span>{' '}
                          <span className="capitalize">
                            {user.programId.status === 'active' ? '✓ Habilitado' : 'En proceso'}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                  <div className="mt-4 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Inscrito
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-linear-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Sin curso asignado</h3>
                <p className="text-blue-700 mt-1">
                  Selecciona un curso de la lista para registrarte
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Seleccionar Curso
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Información para estudiante inscrito */}
      {isEnrolled && (
        <div className="card bg-linear-to-r from-primary-50 to-blue-50 border-primary-200">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            📚 Tu Curso Actual
          </h3>
          <p className="text-primary-700">
            Estás inscrito en <span className="font-bold">
              {typeof user?.programId === 'object' ? user.programId.name : 'tu curso asignado'}
            </span>.
            Pronto estaremos habilitandolo y compartiendo materiales de estudio aquí.
          </p>
        </div>
      )}

      {/* Modal para inscribirse */}
      {showModal && !isEnrolled && (
        <EnrollCourseModal
          courses={courses}
          onClose={() => setShowModal(false)}
          onEnrollSuccess={handleEnrollSuccess}
        />
      )}
    </div>
  );
}
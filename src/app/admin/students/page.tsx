'use client';

import { useState } from 'react';
import { useStudents } from '@/hooks/useStudents';
import AssignCourseModal from '@/components/students/modals/AssignCourseModal';
import Link from 'next/link';
import { Plus, Search, User, Crown, Edit2 } from 'lucide-react';

export default function StudentsPage() {
  const { students, isLoading, error, fetchStudents } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleAssignClick = (student: any) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleAssignSuccess = () => {
    fetchStudents(); // Refrescar lista
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Estudiantes</h1>
          <p className="text-gray-600 mt-2">Administra los estudiantes del sistema</p>
        </div>
        <Link href="/admin/students/new" className="btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Estudiante
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Students List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso Asignado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        {student.role === 'admin' ? (
                          <Crown className="h-4 w-4 text-primary-600" />
                        ) : (
                          <User className="h-4 w-4 text-primary-600" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {student.fullName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${student.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                      {student.role === 'admin' ? 'Administrador' : 'Estudiante'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {student.programId ? (
                        <span className="text-gray-900 font-medium">
                          {student.programId?.name || 'Sin asignar'}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Sin asignar</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(student.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleAssignClick(student)}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Asignar Curso
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay estudiantes</h3>
            <p className="text-gray-600 mb-4">Comienza agregando el primer estudiante.</p>
            <Link href="/admin/students/new" className="btn-primary inline-flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Agregar Estudiante
            </Link>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedStudent && (
        <AssignCourseModal
          studentId={selectedStudent._id}
          studentName={selectedStudent.fullName}
          currentCourseId={selectedStudent.programId?._id}
          currentCourseName={selectedStudent.programId?.name}
          onClose={() => {
            setShowModal(false);
            setSelectedStudent(null);
          }}
          onAssignSuccess={handleAssignSuccess}
        />
      )}
    </div>
  );
}
'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Calendar,
  PlusCircle,
  Network
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Stats {
  totalCourses: number;
  totalStudents: number;
  activeCourses: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    totalStudents: 0,
    activeCourses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // En una app real, tendrías un endpoint específico para stats
        const [coursesRes, studentsRes] = await Promise.all([
          api.get('/api/programs?limit=100'),
          api.get('/api/users?limit=100')
        ]);

        const courses = coursesRes.data.data.items;
        const students = studentsRes.data.data.items;

        setStats({
          totalCourses: courses.length,
          totalStudents: students.length,
          activeCourses: courses.filter((c: any) => c.status === 'active').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total Cursos',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'bg-blue-500',
      href: '/admin/courses'
    },
    {
      name: 'Estudiantes',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/students'
    },
    {
      name: 'Cursos Activos',
      value: stats.activeCourses,
      icon: TrendingUp,
      color: 'bg-purple-500',
      href: '/admin/courses'
    },
  ];

  const quickActions = [
    {
      name: 'Nuevo Curso',
      description: 'Crear un nuevo curso',
      icon: PlusCircle,
      href: '/admin/courses/new',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
    },
    {
      name: 'Agregar Estudiante',
      description: 'Registrar nuevo estudiante',
      icon: Users,
      href: '/admin/students/new',
      color: 'text-green-600 bg-green-50 hover:bg-green-100'
    },
    {
      name: 'GraphQL Demo',
      description: 'Explorar datos con GraphQL',
      icon: Network,
      href: '/admin/graphql',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100'
    }
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.fullName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Aquí tienes un resumen de tu plataforma educativa
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href}>
              <div className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} href={action.href}>
                <div className={`card hover:shadow-md transition-shadow cursor-pointer ${action.color} border-transparent`}>
                  <div className="flex items-center">
                    <Icon className="h-8 w-8" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{action.name}</h3>
                      <p className="text-sm opacity-75">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>La actividad reciente aparecerá aquí</p>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Database, Filter } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string;
  status: string;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function GraphQLPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const debouncedSearch = useDebounce(search, 500);

  // Obtener la URL base desde la variable de entorno
  const getGraphQLUrl = () => {
    // En desarrollo: usa localhost:3001, en producción usa la variable de entorno
    if (typeof window !== 'undefined') {
      return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    }
    return 'http://localhost:3001';
  };

  const fetchPrograms = useCallback(async (filter = '', status = 'all') => {
    try {
      setLoading(true);
      setError('');
      
      let queryFilter = filter;
      if (status !== 'all') {
        queryFilter = queryFilter ? `${queryFilter} ${status}` : status;
      }

      const query = `
        query GetPrograms($filter: String) {
          programs(filter: $filter, page: 1, limit: 20) {
            items {
              id
              name
              description
              status
            }
            total
          }
        }
      `;

      const graphqlUrl = `${getGraphQLUrl()}/graphql`;

      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { filter: queryFilter }
        }),
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      
      setPrograms(result.data.programs.items);
    } catch (err: any) {
      setError(err.message);
      console.error('GraphQL Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms(debouncedSearch, statusFilter);
  }, [debouncedSearch, statusFilter, fetchPrograms]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    const statusLabels = {
      active: 'Activo',
      inactive: 'Inactivo',
      completed: 'Completado',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  if (loading && programs.length === 0) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
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
        <div className="flex items-center mb-2">
          <Database className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">GraphQL Explorer</h1>
        </div>
        <p className="text-gray-600">
          Consulta datos en tiempo real usando GraphQL
        </p>
        {/* Debug info - puedes remover esto en producción */}
        <div className="mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded">
          Conectado a: {getGraphQLUrl()}/graphql
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={handleSearch}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="input-field pl-10"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Solo activos</option>
            <option value="inactive">Solo inactivos</option>
            <option value="completed">Solo completados</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <strong>Error en GraphQL:</strong> {error}
        </div>
      )}

      {/* Loading indicator cuando ya hay datos */}
      {loading && programs.length > 0 && (
        <div className="flex items-center justify-center py-4 text-gray-500 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500 mr-3"></div>
          Actualizando resultados...
        </div>
      )}

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="card hover:shadow-lg transition-all duration-200 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{program.name}</h3>
              {getStatusBadge(program.status)}
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{program.description}</p>
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
              <strong>ID:</strong> {program.id}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {programs.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda o filtros</p>
        </div>
      )}

      {/* Results Info */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>Total: {programs.length} cursos encontrados</span>
        <span>Consultado con GraphQL</span>
      </div>
    </div>
  );
}
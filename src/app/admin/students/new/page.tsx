'use client';

import { useRouter } from 'next/navigation';
import StudentForm from '@/components/forms/StudentForm';
import { useStudents } from '@/hooks/useStudents';
import { StudentFormData } from '@/types/student';

export default function NewStudentPage() {
  const router = useRouter();
  const { createStudent, isLoading } = useStudents();

  const handleSubmit = async (data: StudentFormData) => {
    await createStudent(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <StudentForm 
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
}
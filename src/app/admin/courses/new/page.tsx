'use client';

import { useRouter } from 'next/navigation';
import CourseForm from '@/components/forms/CourseForm';
import { useCourses } from '@/hooks/useCourses';
import { CourseFormData } from '@/types/course';

export default function NewCoursePage() {
  const router = useRouter();
  const { createCourse, isLoading } = useCourses();

  const handleSubmit = async (data: CourseFormData) => {
    await createCourse(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <CourseForm 
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />
    </div>
  );
}
export interface Course {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CourseFormData {
  name: string;
  description: string;
  startDate: string;
  status: 'active' | 'inactive' | 'completed';
}

export interface CourseListResponse {
  items: Course[];
  total: number;
  page: number;
  pages: number;
}
export interface Program {
  _id: string;
  name: string;
  description?: string;
}

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  programId?: Program; // ✅ Puede ser Program o undefined
  role: 'admin' | 'student';
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData {
  fullName: string;
  email: string;
  password: string;
  programId: string;
}
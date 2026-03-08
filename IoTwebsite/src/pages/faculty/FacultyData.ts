// types.ts
export type Department = 'iot' | 'phys';

export interface Professor {
  id: string;
  department_id: string;
  name_th: string;           // ✅ ชื่อจากคอลัมน์ name_th ใน DB
  position: string;
  image: string;
  email: string | null;
  is_head: boolean;           // ✅ แปลงจาก is_head (0/1) ใน DB
  education_history: string[];
  expertise: string[];
  research: Array<{ image: string; link: string }>;
  sort_order: number;
}

export interface ProfessorCardProps {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string | null;
}
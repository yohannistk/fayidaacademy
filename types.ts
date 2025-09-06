export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  grand_name: string;
  age: number;
  school_name: string;
  city: string;
  region: string;
  email: string;
  grade: string;
  referral_source: string;
  created_at: string;
  streak: number;
  last_login: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

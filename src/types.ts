export interface Discipline {
  id: string;
  name: string;
  image: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

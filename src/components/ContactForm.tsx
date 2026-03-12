import React, { useState } from 'react';
import { ContactFormData, FormErrors } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100">
      <h3 className="font-display text-2xl font-bold text-maipu-green mb-6">Envianos un mensaje</h3>
      
      {isSuccess ? (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-md mb-6 border border-emerald-100">
          ¡Gracias por tu mensaje! Te contactaremos a la brevedad.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className={`w-full rounded-md border-slate-300 focus:ring-maipu-green focus:border-maipu-green ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className={`w-full rounded-md border-slate-300 focus:ring-maipu-green focus:border-maipu-green ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
        </div>
        
        <div className="space-y-1">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Asunto"
            className={`w-full rounded-md border-slate-300 focus:ring-maipu-green focus:border-maipu-green ${errors.subject ? 'border-red-500' : ''}`}
          />
          {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
        </div>

        <div className="space-y-1">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            rows={4}
            className={`w-full rounded-md border-slate-300 focus:ring-maipu-green focus:border-maipu-green ${errors.message ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-maipu-green text-white font-bold py-3 rounded-md hover:bg-maipu-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
        </button>
      </form>
    </div>
  );
}

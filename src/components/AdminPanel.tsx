import React, { useState } from 'react';
import { Settings, Image as ImageIcon, FileText, Users, Newspaper, ArrowLeft, Save, Plus, Edit2, Trash2 } from 'lucide-react';
import { DISCIPLINES, NEWS } from '../constants';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('general');

  // Función para volver a la página web principal
  const handleVolver = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex selection:bg-maipu-light-green selection:text-white">
      {/* Menú Lateral (Sidebar) */}
      <aside className="w-64 bg-maipu-accent text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-maipu-green rounded-lg flex items-center justify-center font-display font-bold">M</div>
            <span className="font-display text-xl font-bold tracking-tight">ADMIN</span>
          </div>
          <p className="text-xs text-slate-400">Panel de Control del Club</p>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'general' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={20} /> Información General
          </button>
          <button 
            onClick={() => setActiveTab('disciplinas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'disciplinas' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={20} /> Disciplinas
          </button>
          <button 
            onClick={() => setActiveTab('noticias')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'noticias' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Newspaper size={20} /> Noticias
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleVolver}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm font-bold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={16} /> Volver al sitio web
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Cabecera del admin */}
        <header className="bg-white px-8 py-6 shadow-sm flex items-center justify-between sticky top-0 z-0">
          <h1 className="font-display text-2xl font-bold text-maipu-green capitalize">
            Gestionar {activeTab}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Próximamente: Login de Usuarios</span>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Formularios según la pestaña activa */}
        <div className="p-8">
          
          {/* PESTAÑA: INFORMACIÓN GENERAL */}
          {activeTab === 'general' && (
            <div className="max-w-3xl space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="text-maipu-light-green" size={20}/> Textos de la Portada</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Título Principal</label>
                    <input type="text" defaultValue="CLUB MAIPÚ" className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Subtítulo (Verde)</label>
                    <input type="text" defaultValue="ORGULLO DE BARRIO" className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Descripción corta</label>
                    <textarea defaultValue="Forjando comunidad, valores y pasión deportiva desde 1957." rows={2} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green"></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors">
                    <Save size={18} /> Guardar Cambios
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ImageIcon className="text-maipu-light-green" size={20}/> Imágenes Generales</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">URL Imagen de Fondo (Portada)</label>
                    <input type="text" defaultValue="https://images.unsplash.com/photo-1504450758481-7338eba7524a..." className="w-full rounded-lg border-slate-300 text-slate-500 font-mono text-sm" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors">
                    <Save size={18} /> Guardar Imágenes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA: DISCIPLINAS */}
          {activeTab === 'disciplinas' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">Aquí podrás agregar, editar o eliminar los deportes del club.</p>
                <button className="flex items-center gap-2 bg-maipu-green text-white px-4 py-2 rounded-lg font-bold hover:bg-maipu-accent transition-colors shadow-md">
                  <Plus size={18} /> Nueva Disciplina
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DISCIPLINES.map(disciplina => (
                  <div key={disciplina.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                      <img src={disciplina.image} alt={disciplina.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="w-10 h-10 bg-white text-maipu-green rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Edit2 size={18} /></button>
                        <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-xl text-maipu-green">{disciplina.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PESTAÑA: NOTICIAS */}
          {activeTab === 'noticias' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">Administra las novedades, torneos y comunicados.</p>
                <button className="flex items-center gap-2 bg-maipu-green text-white px-4 py-2 rounded-lg font-bold hover:bg-maipu-accent transition-colors shadow-md">
                  <Plus size={18} /> Publicar Noticia
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {NEWS.map(noticia => (
                      <tr key={noticia.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{noticia.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-maipu-light-green/10 text-maipu-green font-bold text-xs rounded-full">{noticia.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{noticia.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-maipu-green hover:bg-slate-100 rounded-lg transition-colors"><Edit2 size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

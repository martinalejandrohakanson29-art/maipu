import React, { useState } from 'react';
import { Settings, Image as ImageIcon, FileText, Users, Newspaper, ArrowLeft, Save, Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { DISCIPLINES, NEWS } from '../constants';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('general');

  // --- 1. ESTADOS PARA INFORMACIÓN GENERAL Y CONTACTO ---
  const [generalInfo, setGeneralInfo] = useState(() => {
    const saved = localStorage.getItem('maipu_general');
    const defaultInfo = {
      titulo: "CLUB MAIPÚ",
      subtitulo: "ORGULLO DE BARRIO",
      descripcion: "Forjando comunidad, valores y pasión deportiva desde 1957.",
      imagenFondo: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920",
      direccion: "Av. General Paz 1234, Maipú, Mendoza",
      telefono: "+54 0261 4XX-XXXX",
      horarioLV: "Lunes a Viernes: 16:00 a 21:00 hs",
      horarioS: "Sábados: 09:00 a 13:00 hs"
    };
    return saved ? { ...defaultInfo, ...JSON.parse(saved) } : defaultInfo;
  });

  const handleGuardarCambios = (mensaje: string) => {
    localStorage.setItem('maipu_general', JSON.stringify(generalInfo));
    alert(mensaje);
  };

  // --- 2. ESTADOS PARA DISCIPLINAS ---
  const [disciplinas, setDisciplinas] = useState(() => {
    const saved = localStorage.getItem('maipu_disciplinas');
    return saved ? JSON.parse(saved) : DISCIPLINES;
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', image: '' });

  const handleEliminarDisciplina = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta disciplina?')) {
      const nuevaLista = disciplinas.filter((d: any) => d.id !== id);
      setDisciplinas(nuevaLista);
      localStorage.setItem('maipu_disciplinas', JSON.stringify(nuevaLista));
    }
  };

  const handleIniciarEdicion = (disciplina: any) => {
    setEditingId(disciplina.id);
    setEditForm({ name: disciplina.name, image: disciplina.image });
  };

  const handleGuardarEdicion = () => {
    const listaActualizada = disciplinas.map((disciplina: any) => {
      if (disciplina.id === editingId) {
        return { ...disciplina, name: editForm.name, image: editForm.image };
      }
      return disciplina;
    });
    setDisciplinas(listaActualizada);
    localStorage.setItem('maipu_disciplinas', JSON.stringify(listaActualizada));
    setEditingId(null);
    alert('¡Disciplina actualizada correctamente!');
  };

  // --- 3. ESTADOS PARA NOTICIAS ---
  const [noticias, setNoticias] = useState(() => {
    const saved = localStorage.getItem('maipu_noticias');
    return saved ? JSON.parse(saved) : NEWS;
  });

  // Estado para saber qué noticia editamos ('new' para una nueva, o el ID de una existente)
  const [editingNoticiaId, setEditingNoticiaId] = useState<string | null>(null);
  // Estado para guardar los datos del formulario de la noticia
  const [noticiaForm, setNoticiaForm] = useState({ id: '', title: '', category: '', description: '', date: '', image: '' });

  const handleNuevaNoticia = () => {
    // Preparamos el formulario vacío para una noticia nueva
    const fechaActual = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
    setNoticiaForm({ id: Date.now().toString(), title: '', category: 'Institucional', description: '', date: fechaActual, image: '' });
    setEditingNoticiaId('new');
  };

  const handleIniciarEdicionNoticia = (noticia: any) => {
    // Cargamos los datos de la noticia existente en el formulario
    setNoticiaForm(noticia);
    setEditingNoticiaId(noticia.id);
  };

  const handleGuardarNoticia = () => {
    let nuevaLista;
    if (editingNoticiaId === 'new') {
      // Si es nueva, la agregamos al principio de la lista
      nuevaLista = [noticiaForm, ...noticias];
    } else {
      // Si ya existía, la actualizamos
      nuevaLista = noticias.map((n: any) => n.id === editingNoticiaId ? noticiaForm : n);
    }
    setNoticias(nuevaLista);
    localStorage.setItem('maipu_noticias', JSON.stringify(nuevaLista));
    setEditingNoticiaId(null); // Cerramos el formulario
    alert('¡Noticia guardada con éxito!');
  };

  const handleEliminarNoticia = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      const nuevaLista = noticias.filter((n: any) => n.id !== id);
      setNoticias(nuevaLista);
      localStorage.setItem('maipu_noticias', JSON.stringify(nuevaLista));
    }
  };

  const funcionEnDesarrollo = () => alert('Esta función estará disponible próximamente.');
  const handleVolver = () => window.location.hash = '';

  return (
    <div className="min-h-screen bg-slate-100 flex selection:bg-maipu-light-green selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-maipu-accent text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-maipu-green rounded-lg flex items-center justify-center font-display font-bold">M</div>
            <span className="font-display text-xl font-bold tracking-tight">ADMIN</span>
          </div>
          <p className="text-xs text-slate-400">Panel de Control del Club</p>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          <button onClick={() => setActiveTab('general')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'general' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Settings size={20} /> Información General
          </button>
          <button onClick={() => setActiveTab('disciplinas')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'disciplinas' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Users size={20} /> Disciplinas
          </button>
          <button onClick={() => setActiveTab('noticias')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'noticias' ? 'bg-maipu-green text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Newspaper size={20} /> Noticias
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleVolver} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-sm font-bold text-slate-300 hover:text-white">
            <ArrowLeft size={16} /> Volver al sitio web
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        <header className="bg-white px-8 py-6 shadow-sm flex items-center justify-between sticky top-0 z-0">
          <h1 className="font-display text-2xl font-bold text-maipu-green capitalize">Gestionar {activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">AD</div>
          </div>
        </header>

        <div className="p-8">
          {/* Pestaña: Información General */}
          {activeTab === 'general' && (
            <div className="max-w-3xl space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="text-maipu-light-green" size={20}/> Textos de la Portada</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Título Principal</label>
                    <input type="text" value={generalInfo.titulo || ''} onChange={(e) => setGeneralInfo({...generalInfo, titulo: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Subtítulo (Verde)</label>
                    <input type="text" value={generalInfo.subtitulo || ''} onChange={(e) => setGeneralInfo({...generalInfo, subtitulo: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Descripción corta</label>
                    <textarea value={generalInfo.descripcion || ''} onChange={(e) => setGeneralInfo({...generalInfo, descripcion: e.target.value})} rows={2} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green"></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => handleGuardarCambios('¡Textos de portada guardados!')} className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors"><Save size={18} /> Guardar Textos</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin className="text-maipu-light-green" size={20}/> Datos de Contacto y Visitas</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Dirección Completa</label>
                    <input type="text" value={generalInfo.direccion || ''} onChange={(e) => setGeneralInfo({...generalInfo, direccion: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Teléfono</label>
                    <input type="text" value={generalInfo.telefono || ''} onChange={(e) => setGeneralInfo({...generalInfo, telefono: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Horario Lun a Vie</label>
                      <input type="text" value={generalInfo.horarioLV || ''} onChange={(e) => setGeneralInfo({...generalInfo, horarioLV: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Horario Sábados</label>
                      <input type="text" value={generalInfo.horarioS || ''} onChange={(e) => setGeneralInfo({...generalInfo, horarioS: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green focus:border-maipu-green" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => handleGuardarCambios('¡Datos de contacto guardados!')} className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors"><Save size={18} /> Guardar Contacto</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ImageIcon className="text-maipu-light-green" size={20}/> Imagen de Portada</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">URL Imagen de Fondo</label>
                    <input type="text" value={generalInfo.imagenFondo || ''} onChange={(e) => setGeneralInfo({...generalInfo, imagenFondo: e.target.value})} className="w-full rounded-lg border-slate-300 text-slate-500 font-mono text-sm" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => handleGuardarCambios('¡Imagen de fondo guardada!')} className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors"><Save size={18} /> Guardar Imagen</button>
                </div>
              </div>
            </div>
          )}

          {/* Pestaña: Disciplinas */}
          {activeTab === 'disciplinas' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">Gestiona los deportes del club.</p>
                <button onClick={funcionEnDesarrollo} className="flex items-center gap-2 bg-maipu-green text-white px-4 py-2 rounded-lg font-bold hover:bg-maipu-accent transition-colors shadow-md">
                  <Plus size={18} /> Nueva Disciplina
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {disciplinas.map((disciplina: any) => (
                  <div key={disciplina.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {editingId === disciplina.id ? (
                      <div className="p-4 flex flex-col gap-3 h-full justify-center bg-slate-50">
                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full rounded text-sm border-slate-300" placeholder="Nombre"/>
                        <input type="text" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} className="w-full rounded text-sm border-slate-300" placeholder="URL Imagen"/>
                        <div className="flex gap-2">
                          <button onClick={handleGuardarEdicion} className="flex-1 bg-maipu-green text-white py-2 rounded font-bold text-sm">Guardar</button>
                          <button onClick={() => setEditingId(null)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded font-bold text-sm">Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="h-40 overflow-hidden relative group">
                          <img src={disciplina.image} alt={disciplina.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button onClick={() => handleIniciarEdicion(disciplina)} className="w-10 h-10 bg-white text-maipu-green rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><Edit2 size={18} /></button>
                            <button onClick={() => handleEliminarDisciplina(disciplina.id)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><Trash2 size={18} /></button>
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-display font-bold text-xl text-maipu-green uppercase">{disciplina.name}</h3>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pestaña: Noticias */}
          {activeTab === 'noticias' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">Administra las novedades y comunicados.</p>
                {!editingNoticiaId && (
                  <button onClick={handleNuevaNoticia} className="flex items-center gap-2 bg-maipu-green text-white px-4 py-2 rounded-lg font-bold hover:bg-maipu-accent transition-colors shadow-md">
                    <Plus size={18} /> Publicar Noticia
                  </button>
                )}
              </div>

              {/* Si estamos editando o creando una noticia, mostramos este formulario */}
              {editingNoticiaId ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-lg text-maipu-green mb-6 border-b pb-2">
                    {editingNoticiaId === 'new' ? 'Crear Nueva Noticia' : 'Editar Noticia'}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Título</label>
                        <input type="text" value={noticiaForm.title} onChange={(e) => setNoticiaForm({...noticiaForm, title: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green" placeholder="Ej: ¡Gran victoria!" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Categoría</label>
                        <input type="text" value={noticiaForm.category} onChange={(e) => setNoticiaForm({...noticiaForm, category: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green" placeholder="Ej: Deportes" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Fecha</label>
                        <input type="text" value={noticiaForm.date} onChange={(e) => setNoticiaForm({...noticiaForm, date: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green" placeholder="Ej: 15 de Mayo, 2024" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">URL de la Imagen</label>
                        <input type="text" value={noticiaForm.image} onChange={(e) => setNoticiaForm({...noticiaForm, image: e.target.value})} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green text-slate-500" placeholder="https://..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Descripción / Texto</label>
                      <textarea value={noticiaForm.description} onChange={(e) => setNoticiaForm({...noticiaForm, description: e.target.value})} rows={4} className="w-full rounded-lg border-slate-300 focus:ring-maipu-green"></textarea>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={handleGuardarNoticia} className="flex items-center gap-2 bg-maipu-green text-white px-6 py-2.5 rounded-lg font-bold hover:bg-maipu-accent transition-colors">
                      <Save size={18} /> Guardar Noticia
                    </button>
                    <button onClick={() => setEditingNoticiaId(null)} className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-300 transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Si NO estamos editando, mostramos la tabla normal */
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-6 py-4">Imagen</th>
                        <th className="px-6 py-4">Fecha</th>
                        <th className="px-6 py-4">Categoría</th>
                        <th className="px-6 py-4">Título</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {noticias.map((noticia: any) => (
                        <tr key={noticia.id} className="hover:bg-slate-50 transition-colors text-sm">
                          <td className="px-6 py-3">
                            <img src={noticia.image} alt="Miniatura" className="w-12 h-12 object-cover rounded-md border border-slate-200" />
                          </td>
                          <td className="px-6 py-4 text-slate-500">{noticia.date}</td>
                          <td className="px-6 py-4"><span className="px-3 py-1 bg-maipu-light-green/10 text-maipu-green font-bold text-xs rounded-full">{noticia.category}</span></td>
                          <td className="px-6 py-4 font-medium text-slate-800">{noticia.title}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleIniciarEdicionNoticia(noticia)} className="p-2 text-slate-400 hover:text-maipu-green hover:bg-slate-100 rounded-lg transition-colors" title="Editar"><Edit2 size={16} /></button>
                              <button onClick={() => handleEliminarNoticia(noticia.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

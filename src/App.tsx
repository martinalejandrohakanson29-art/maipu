import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, MapPin, Phone, Clock, Facebook, Instagram, ChevronRight,
  CheckCircle2, Trophy, Users, Calendar
} from 'lucide-react';
import { DISCIPLINES, NEWS } from './constants';
import ContactForm from './components/ContactForm';
import Modal from './components/Modal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#admin' ? 'admin' : 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  // --- LEEMOS LOS DATOS DINÁMICOS ---
  const [generalInfo] = useState(() => {
    const saved = localStorage.getItem('maipu_general');
    return saved ? JSON.parse(saved) : {
      titulo: "CLUB MAIPÚ",
      subtitulo: "ORGULLO DE BARRIO",
      descripcion: "Forjando comunidad, valores y pasión deportiva desde 1957.",
      imagenFondo: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920",
      direccion: "Av. General Paz 1234, Maipú, Mendoza",
      telefono: "+54 0261 4XX-XXXX",
      horarioLV: "Lunes a Viernes: 16:00 a 21:00 hs",
      horarioS: "Sábados: 09:00 a 13:00 hs"
    };
  });

  const [disciplinas] = useState(() => {
    const saved = localStorage.getItem('maipu_disciplinas');
    return saved ? JSON.parse(saved) : DISCIPLINES;
  });

  const [noticias] = useState(() => {
    const saved = localStorage.getItem('maipu_noticias');
    return saved ? JSON.parse(saved) : NEWS;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocioModalOpen, setIsSocioModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Disciplinas', href: '#disciplinas' },
    { name: 'Noticias', href: '#noticias' },
    { name: 'Socios', href: '#socios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-maipu-light-green selection:text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'}`}>
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-maipu-green rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">M</div>
            <span className="font-display text-2xl font-bold text-maipu-green tracking-tight">CLUB MAIPÚ</span>
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-maipu-green uppercase tracking-wider hover:text-maipu-light-green transition-colors">{link.name}</a>
            ))}
            <button onClick={() => setIsSocioModalOpen(true)} className="bg-maipu-green text-white px-6 py-2 rounded-full font-bold hover:bg-maipu-accent transition-all shadow-lg text-sm">¡HACETE SOCIO!</button>
          </div>
          <button className="md:hidden text-maipu-green p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Fondo Portada" className="w-full h-full object-cover scale-105" src={generalInfo.imagenFondo} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl leading-tight">
                {generalInfo.titulo}<br/><span className="text-maipu-light-green">{generalInfo.subtitulo}</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light italic opacity-90">{generalInfo.descripcion}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="#disciplinas" className="bg-white text-maipu-green px-10 py-4 rounded-md font-bold text-lg uppercase tracking-widest">Actividades</a>
                <button onClick={() => setIsSocioModalOpen(true)} className="border-2 border-white text-white px-10 py-4 rounded-md font-bold text-lg uppercase tracking-widest backdrop-blur-sm">Sumate</button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: 'Socios Activos', value: '+1500' },
                { icon: Trophy, label: 'Títulos Ganados', value: '42' },
                { icon: Calendar, label: 'Años de Historia', value: '67' },
                { icon: CheckCircle2, label: 'Disciplinas', value: disciplinas.length.toString() },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="mx-auto text-maipu-light-green mb-2" size={32} />
                  <div className="text-3xl font-display font-bold text-maipu-green">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disciplinas */}
        <section className="py-24 bg-white" id="disciplinas">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl font-bold text-maipu-green mb-4 text-center">DISCIPLINAS</h2>
              <div className="w-24 h-1.5 bg-maipu-light-green mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {disciplinas.map((discipline: any, index: number) => (
                <motion.div key={discipline.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative overflow-hidden rounded-2xl shadow-xl aspect-[4/5]">
                  <img alt={discipline.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={discipline.image} referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maipu-green/90 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white font-display text-3xl font-bold mb-2 uppercase">{discipline.name}</h3>
                    <button className="text-white/80 text-sm font-bold flex items-center gap-2">Ver horarios <ChevronRight size={16} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Noticias */}
        <section className="py-24 bg-slate-100" id="noticias">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-5xl font-bold text-maipu-green mb-12">NOTICIAS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {noticias.map((item: any, index: number) => (
                <motion.article key={item.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 group">
                  <div className="overflow-hidden h-56"><img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={item.image} /></div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-maipu-light-green uppercase">{item.category}</span>
                    <h3 className="text-2xl font-bold mt-3 mb-4 text-maipu-green">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3">{item.description}</p>
                    <div className="pt-6 border-t border-slate-50 text-xs text-slate-400 font-medium">{item.date}</div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Visitanos (NUEVO: AHORA DINÁMICO) */}
        <section className="py-24 bg-white" id="contacto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="font-display text-5xl font-bold text-maipu-green mb-8 text-center lg:text-left uppercase">VISITANOS</h2>
                <p className="text-slate-600 mb-12 text-lg">Estamos en el corazón de Maipú. Acercate a conocer nuestras instalaciones y sumate a la disciplina que más te guste.</p>
                <div className="space-y-10">
                  <div className="flex items-start gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green"><MapPin size={32} /></div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1 uppercase tracking-tight">Dirección</h4>
                      <p className="text-slate-600">{generalInfo.direccion}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green"><Phone size={32} /></div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1 uppercase tracking-tight">Teléfono</h4>
                      <p className="text-slate-600">{generalInfo.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green"><Clock size={32} /></div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1 uppercase tracking-tight">Secretaría</h4>
                      <p className="text-slate-600">{generalInfo.horarioLV}</p>
                      <p className="text-slate-600">{generalInfo.horarioS}</p>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-maipu-accent text-slate-400 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">M</div>
                <span className="font-display text-2xl font-bold text-white tracking-tight uppercase">CLUB MAIPÚ</span>
             </div>
             <p className="text-sm opacity-50 text-center">© {new Date().getFullYear()} Club Maipú. Todos los derechos reservados.</p>
             <div className="flex gap-4">
                <Facebook className="hover:text-white cursor-pointer" size={20} />
                <Instagram className="hover:text-white cursor-pointer" size={20} />
             </div>
          </div>
        </div>
      </footer>

      <Modal isOpen={isSocioModalOpen} onClose={() => setIsSocioModalOpen(false)} title="¡Sumate al Club!">
        <div className="space-y-6">
          <p className="text-slate-600">Completá tus datos y te contactaremos a la brevedad.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSocioModalOpen(false); }}>
            <input type="text" placeholder="Nombre completo" className="w-full rounded-md border-slate-300" required />
            <input type="email" placeholder="Email" className="w-full rounded-md border-slate-300" required />
            <button type="submit" className="w-full bg-maipu-green text-white font-bold py-3 rounded-md">ENVIAR SOLICITUD</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

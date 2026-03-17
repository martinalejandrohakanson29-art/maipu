import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Facebook, 
  Instagram, 
  ChevronRight,
  CheckCircle2,
  Trophy,
  Users,
  Calendar
} from 'lucide-react';
import { DISCIPLINES, NEWS } from './constants';
import ContactForm from './components/ContactForm';
import Modal from './components/Modal';
import AdminPanel from './components/AdminPanel'; // IMPORTAMOS EL NUEVO PANEL

export default function App() {
  // Lógica para detectar si estamos en la vista de administrador o en la web normal
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

  // Si estamos en la ruta /#admin, mostramos únicamente el panel de control
  if (currentView === 'admin') {
    return <AdminPanel />;
  }

  // =========================================================================
  // AQUÍ COMIENZA EL CÓDIGO ORIGINAL DE TU WEB - TODO SE MANTIENE EXACTAMENTE IGUAL
  // =========================================================================

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSocioModalOpen, setIsSocioModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'
        }`}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-maipu-green rounded-lg flex items-center justify-center text-white font-display font-bold text-xl group-hover:rotate-3 transition-transform">
              M
            </div>
            <span className="font-display text-2xl font-bold text-maipu-green tracking-tight">CLUB MAIPÚ</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-maipu-green uppercase tracking-wider hover:text-maipu-light-green transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setIsSocioModalOpen(true)}
              className="bg-maipu-green text-white px-6 py-2 rounded-full font-bold hover:bg-maipu-accent transition-all shadow-lg hover:shadow-maipu-green/20 text-sm"
            >
              ¡HACETE SOCIO!
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-maipu-green p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-maipu-green uppercase"
                  >
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsSocioModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-maipu-green text-white w-full py-3 rounded-md font-bold"
                >
                  ¡HACETE SOCIO!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Club Maipú Atmosphere" 
              className="w-full h-full object-cover scale-105" 
              src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 hero-overlay"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl leading-tight">
                CLUB MAIPÚ<br/>
                <span className="text-maipu-light-green">ORGULLO DE BARRIO</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light italic opacity-90">
                Forjando comunidad, valores y pasión deportiva desde 1957.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="#disciplinas" 
                  className="bg-white text-maipu-green px-10 py-4 rounded-md font-bold text-lg hover:bg-slate-100 transition-all shadow-xl uppercase tracking-widest"
                >
                  Nuestras Actividades
                </a>
                <button 
                  onClick={() => setIsSocioModalOpen(true)}
                  className="border-2 border-white text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-maipu-green transition-all uppercase tracking-widest backdrop-blur-sm"
                >
                  Sumate al Club
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: 'Socios Activos', value: '+1500' },
                { icon: Trophy, label: 'Títulos Ganados', value: '42' },
                { icon: Calendar, label: 'Años de Historia', value: '67' },
                { icon: CheckCircle2, label: 'Disciplinas', value: '12' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="mx-auto text-maipu-light-green mb-2" size={32} />
                  <div className="text-3xl font-display font-bold text-maipu-green">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disciplines Section */}
        <section className="py-24 bg-white" id="disciplinas">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl font-bold text-maipu-green mb-4">DISCIPLINAS</h2>
              <div className="w-24 h-1.5 bg-maipu-light-green mx-auto rounded-full"></div>
              <p className="mt-6 text-slate-600 text-lg max-w-xl mx-auto">
                Entrenamos el cuerpo, formamos personas. Contamos con profesionales de primer nivel en cada área.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {DISCIPLINES.map((discipline, index) => (
                <motion.div 
                  key={discipline.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover-lift aspect-[4/5]"
                >
                  <img 
                    alt={discipline.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={discipline.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maipu-green/90 via-maipu-green/20 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white font-display text-3xl font-bold mb-2">{discipline.name}</h3>
                    <button className="text-white/80 text-sm font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver horarios <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-24 bg-slate-100" id="noticias">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div>
                <h2 className="font-display text-5xl font-bold text-maipu-green mb-2">NOTICIAS</h2>
                <div className="w-20 h-1.5 bg-maipu-light-green rounded-full"></div>
              </div>
              <button className="text-maipu-green font-bold flex items-center gap-2 hover:translate-x-2 transition-transform group">
                Ver todas las novedades
                <ChevronRight className="group-hover:text-maipu-light-green" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {NEWS.map((item, index) => (
                <motion.article 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-xl transition-all group"
                >
                  <div className="overflow-hidden h-56">
                    <img 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={item.image}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-maipu-light-green uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-2xl font-bold mt-3 mb-4 text-maipu-green leading-tight group-hover:text-maipu-light-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                      <a href="#" className="text-maipu-green font-bold text-sm hover:underline">Leer más</a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-24 bg-maipu-green text-white relative overflow-hidden" id="socios">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-maipu-light-green/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-5xl md:text-6xl font-bold mb-8">
                    SÉ PARTE DE LA <br/>
                    <span className="text-maipu-light-green">FAMILIA VERDE</span>
                  </h2>
                  <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                    Ser socio es mucho más que pagar una cuota. Es apoyar el crecimiento de los chicos del barrio, cuidar nuestra historia y disfrutar de beneficios exclusivos en nuestra sede.
                  </p>
                  <ul className="space-y-6 mb-12">
                    {[
                      'Acceso preferencial a instalaciones y salones.',
                      'Descuentos en cuotas de todas las disciplinas.',
                      'Beneficios en comercios adheridos de la zona.',
                      'Participación activa en la vida social del club.'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg">
                        <div className="bg-maipu-light-green/20 p-1.5 rounded-full">
                          <CheckCircle2 className="text-maipu-light-green" size={24} />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setIsSocioModalOpen(true)}
                    className="bg-white text-maipu-green px-12 py-5 rounded-full font-bold text-xl hover:bg-slate-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
                  >
                    ¡HACETE SOCIO AHORA!
                  </button>
                </motion.div>
              </div>
              
              <div className="lg:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white p-10 rounded-3xl shadow-2xl text-maipu-green rotate-3 max-w-md mx-auto relative z-20">
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-12 h-12 bg-maipu-green rounded-lg flex items-center justify-center text-white font-display font-bold text-2xl">M</div>
                      <span className="font-bold text-xs bg-maipu-light-green text-white px-4 py-1.5 rounded-full tracking-widest uppercase">SOCIO ACTIVO</span>
                    </div>
                    <div className="space-y-6">
                      <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                      <div className="pt-12 flex items-center gap-5">
                        <div className="h-16 w-16 bg-slate-200 rounded-2xl"></div>
                        <div className="space-y-3">
                          <div className="h-3 bg-slate-100 rounded-full w-32"></div>
                          <div className="h-3 bg-slate-100 rounded-full w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-maipu-light-green p-8 rounded-2xl text-white shadow-2xl -rotate-6 z-30">
                    <p className="font-display font-bold text-4xl mb-1">67 AÑOS</p>
                    <p className="text-sm font-semibold opacity-90 uppercase tracking-wider">Cuidando el deporte barrial</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-white" id="contacto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="font-display text-5xl font-bold text-maipu-green mb-8">VISITANOS</h2>
                <p className="text-slate-600 mb-12 text-lg">
                  Estamos en el corazón de Maipú. Acercate a conocer nuestras instalaciones y sumate a la disciplina que más te guste.
                </p>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green group-hover:bg-maipu-green group-hover:text-white transition-colors">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1">Dirección</h4>
                      <p className="text-slate-600">Av. General Paz 1234, Maipú, Mendoza, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green group-hover:bg-maipu-green group-hover:text-white transition-colors">
                      <Phone size={32} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1">Teléfono</h4>
                      <p className="text-slate-600">+54 0261 4XX-XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="bg-slate-50 p-4 rounded-2xl text-maipu-green group-hover:bg-maipu-green group-hover:text-white transition-colors">
                      <Clock size={32} />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-maipu-green mb-1">Secretaría</h4>
                      <p className="text-slate-600">Lunes a Viernes: 16:00 a 21:00 hs</p>
                      <p className="text-slate-600">Sábados: 09:00 a 13:00 hs</p>
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
      <footer className="bg-maipu-accent text-slate-400 py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">M</div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">CLUB MAIPÚ</span>
              </div>
              <p className="mb-8 max-w-md leading-relaxed text-slate-400">
                Fundado el 15 de mayo de 1957, el Club Maipú nació de la inquietud de un grupo de vecinos por crear un espacio de encuentro, deporte y cultura para todas las edades. Hoy, seguimos honrando ese legado con más de 10 disciplinas y cientos de familias asociadas.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-maipu-green transition-all">
                  <Facebook size={24} />
                </a>
                <a href="#" className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-maipu-green transition-all">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-white mb-8 uppercase tracking-widest">Menú</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-maipu-light-green" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-white mb-8 uppercase tracking-widest">Legales</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Estatuto Social</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Transparencia</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 text-center text-sm opacity-50">
            <p>© {new Date().getFullYear()} Club Maipú. Todos los derechos reservados. Diseñado para la comunidad.</p>
          </div>
        </div>
      </footer>

      {/* Socio Modal */}
      <Modal 
        isOpen={isSocioModalOpen} 
        onClose={() => setIsSocioModalOpen(false)} 
        title="¡Sumate al Club!"
      >
        <div className="space-y-6">
          <p className="text-slate-600">
            Completá tus datos y un representante de secretaría se pondrá en contacto con vos para finalizar tu asociación.
          </p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsSocioModalOpen(false); }}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre" className="w-full rounded-md border-slate-300" required />
              <input type="text" placeholder="Apellido" className="w-full rounded-md border-slate-300" required />
            </div>
            <input type="email" placeholder="Email" className="w-full rounded-md border-slate-300" required />
            <input type="tel" placeholder="Teléfono" className="w-full rounded-md border-slate-300" required />
            <select className="w-full rounded-md border-slate-300">
              <option>Plan Individual</option>
              <option>Plan Familiar</option>
              <option>Plan Juvenil</option>
            </select>
            <button type="submit" className="w-full bg-maipu-green text-white font-bold py-3 rounded-md shadow-lg">
              ENVIAR SOLICITUD
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

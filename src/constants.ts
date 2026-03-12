import { Discipline, NewsItem } from "./types";

export const DISCIPLINES: Discipline[] = [
  {
    id: "basket",
    name: "BÁSQUET",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "voley",
    name: "VÓLEY",
    image: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "taekwondo",
    name: "TAEKWONDO",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "gimnasia",
    name: "GIMNASIA",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "1",
    category: "Institucional",
    title: "Abiertas las inscripciones para la temporada 2024",
    description: "Ya podés anotarte en todas nuestras disciplinas. Contamos con beneficios para grupos familiares y descuentos por pago anual.",
    date: "15 de Mayo, 2024",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    category: "Instalaciones",
    title: "Nueva iluminación LED en el microestadio",
    description: "Seguimos mejorando nuestra casa. Finalizamos la instalación de las nuevas luminarias profesionales para alta competencia.",
    date: "10 de Mayo, 2024",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    category: "Deportes",
    title: "¡Gran victoria de la primera en el torneo regional!",
    description: "Nuestros chicos de Básquet lograron un triunfo clave para posicionarse en los primeros puestos de la tabla general.",
    date: "05 de Mayo, 2024",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
  },
];

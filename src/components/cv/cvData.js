// Single source of truth for CV page content.
// All sections read from this module — edit values here to update the CV.

export const cvData = {
  profile: {
    fullName: "Gabriel David Díaz Garavito",
    shortName: "Gabriel Díaz",
    role: "Tecnólogo en Desarrollo de Software",
    company: "Don Prueba",
    tagline:
      "Diseño y construyo agentes de IA y automatizaciones que reemplazan tareas repetitivas en empresas.",
    location: "Bogotá, Colombia",
    phone: "+57 320 811 2607",
    phoneRaw: "573208112607",
    email: "gddiazga@gmail.com",
    github: "https://github.com/zahirbombap-hub",
    linkedin:
      "https://www.linkedin.com/in/gabriel-david-diaz-garavito-3a013b2a0/",
    photoBase: "/multimedia/foto-gabriel-1x.webp",
    photoBase2x: "/multimedia/foto-gabriel-2x.webp",
    photoFallback: "/multimedia/foto-gabriel.jpg",
  },

  about: [
    "Soy desarrollador de software con base técnica en Python, React y C++, y un foco claro en automatización con IA. Combino integración de LLMs y APIs externas con herramientas como ZeroClaw para construir agentes conversacionales y pipelines que reemplazan tareas repetitivas en empresas reales.",
    "Mi diferencial es el cruce entre lo industrial y lo moderno: vengo de validar sistemas de telemedida con DLMS/COSEM, Modbus y TCP/IP en laboratorio, y aplico ese misma rigurosidad diagnóstica a las automatizaciones con IA que entrego en Don Prueba.",
  ],

  stats: [
    { label: "Ubicación", value: "Bogotá, Colombia", icon: "map" },
    { label: "Modalidad", value: "Remoto · Híbrido · Presencial", icon: "briefcase" },
    { label: "Disponibilidad", value: "Abierto a contrato", icon: "calendar" },
    { label: "Idiomas", value: "Español nativo · Inglés A1-A2", icon: "globe" },
  ],

  experience: [
    {
      company: "Trilliant Networks Colombia S.A.S",
      role: "Técnico de Laboratorio y Analista de Desarrollo",
      period: "Nov 2021 — Oct 2025",
      location: "Bogotá",
      bullets: [
        "Frontend en producción con React y Angular: componentes reutilizables, manejo de estado y consumo de APIs REST.",
        "Desarrollo y análisis técnico en Delphi y .NET Framework para telemedida de medidores eléctricos.",
        "Implementación y soporte de protocolos DLMS/COSEM, Modbus y TCP/IP para transmisión segura de datos.",
        "Diagnóstico, validación y control de tramas de comunicación en escenarios reales de red.",
        "Pruebas de laboratorio asegurando la operación correcta de sistemas bajo distintos escenarios.",
        "Análisis y depuración de datos técnicos con Oracle y SQL Server.",
      ],
      tags: ["React", "Angular", "Delphi", ".NET", "DLMS/COSEM", "Modbus", "Oracle", "SQL Server"],
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 85 },
        { name: "Angular", level: 75 },
        { name: "JavaScript / TypeScript", level: 80 },
        { name: "HTML / CSS", level: 90 },
        { name: "Tailwind CSS", level: 85 },
      ],
    },
    {
      category: "Backend / Lenguajes",
      items: [
        { name: "Python", level: 88 },
        { name: "C++", level: 70 },
        { name: "Delphi", level: 75 },
        { name: ".NET Framework", level: 70 },
      ],
    },
    {
      category: "Automatización & IA",
      items: [
        { name: "Agentes conversacionales (LLMs)", level: 88 },
        { name: "ZeroClaw", level: 75 },
        { name: "Integración de APIs de IA", level: 85 },
        { name: "Procesamiento de datos", level: 80 },
      ],
      featured: true,
    },
    {
      category: "Datos",
      items: [
        { name: "Oracle", level: 75 },
        { name: "SQL Server", level: 78 },
        { name: "Modelado relacional", level: 75 },
      ],
    },
    {
      category: "Industrial",
      items: [
        { name: "DLMS / COSEM", level: 80 },
        { name: "Modbus", level: 78 },
        { name: "TCP / IP", level: 80 },
        { name: "Telemedida", level: 75 },
      ],
    },
  ],

  projects: [
    {
      title: "Agente de Correos UNINPAHU",
      description:
        "Agente conversacional que automatiza la clasificación y respuesta de correos académicos, integrando un LLM con la infraestructura de correo institucional.",
      tags: ["LLM", "Agente", "Python", "Automatización"],
      featured: true,
      badge: "IA / Automatización",
      badgeKind: "glow",
      repo: null,
      demo: null,
      context: "Proyecto académico UNINPAHU",
    },
    {
      title: "Scraper SECOP 2 — Detección de irregularidades",
      description:
        "Sistema vía API que scrapea contratos gubernamentales de Colombia (SECOP 2) para buscar irregularidades y exponer patrones de corrupción.",
      tags: ["API", "Scraping", "Python", "Datos abiertos"],
      featured: true,
      badge: "IA / Automatización",
      badgeKind: "glow",
      repo: null,
      demo: null,
      context: "Proyecto de transparencia",
    },
    {
      title: "Don Prueba — Sitio corporativo",
      description:
        "Sitio web empresarial de Don Prueba: landing, automatizaciones, apps y artículos. React 19 + Tailwind + Cloudflare Pages.",
      tags: ["React", "Tailwind", "Cloudflare"],
      featured: true,
      badge: "IA / Automatización",
      badgeKind: "glow",
      repo: null,
      demo: "https://donprueba.online",
      context: "Empresa propia",
    },
    {
      title: "Organizador de archivos en la nube",
      description:
        "Automatización que organiza archivos en Google Drive y Azure OneDrive según reglas configurables (tipo, fecha, proyecto).",
      tags: ["Google Drive API", "OneDrive API", "Python"],
      featured: false,
      badge: "Personal",
      badgeKind: "default",
      repo: null,
      demo: null,
      context: "Mini-proyecto personal",
    },
    {
      title: "Automatizaciones GitHub",
      description:
        "Bots para incorporar cambios, revisar código y notificar al equipo sobre PRs e issues. Webhooks + GitHub Actions.",
      tags: ["GitHub API", "Webhooks", "Node.js"],
      featured: false,
      badge: "Personal",
      badgeKind: "default",
      repo: null,
      demo: null,
      context: "Mini-proyecto personal",
    },
    {
      title: "Detector de procrastinación",
      description:
        "Sistema que detecta inactividad frente al PC por cámara y emite alertas sonoras cuando detecta que no estás trabajando.",
      tags: ["Computer Vision", "OpenCV", "Python"],
      featured: false,
      badge: "Personal",
      badgeKind: "default",
      repo: null,
      demo: null,
      context: "Mini-proyecto personal",
    },
    {
      title: "Reconocimiento de emociones con Hume.ai",
      description:
        "Análisis emocional en tiempo real desde la cámara, usando la API de Hume.ai para detectar expresiones y tono.",
      tags: ["Hume.ai", "Computer Vision", "IA"],
      featured: false,
      badge: "Personal",
      badgeKind: "default",
      repo: null,
      demo: null,
      context: "Mini-proyecto personal",
    },
  ],

  education: [
    {
      institution: "UNINPAHU",
      title: "Tecnólogo en Desarrollo de Software",
      period: "2022 — 2026",
      location: "Bogotá, Colombia",
    },
    {
      institution: "SENA",
      title: "Técnico en Programación de Software",
      period: "2020 — 2021",
      location: "Bogotá, Colombia",
    },
  ],

  cvPdf: {
    es: "/cv-gabriel-diaz-es.pdf",
    en: "/cv-gabriel-diaz-en.pdf",
    html: "/cv-gabriel-diaz-es.html",
  },

  contact: [
    {
      label: "Email",
      value: "gddiazga@gmail.com",
      href: "mailto:gddiazga@gmail.com",
      icon: "mail",
    },
    {
      label: "WhatsApp",
      value: "+57 320 811 2607",
      href: "https://wa.me/573208112607",
      icon: "phone",
    },
    {
      label: "GitHub",
      value: "github.com/zahirbombap-hub",
      href: "https://github.com/zahirbombap-hub",
      icon: "github",
    },
    {
      label: "LinkedIn",
      value: "in/gabriel-david-diaz-garavito",
      href: "https://www.linkedin.com/in/gabriel-david-diaz-garavito-3a013b2a0/",
      icon: "linkedin",
    },
  ],
};

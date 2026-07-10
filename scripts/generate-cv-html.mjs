import { writeFileSync } from 'fs';

const cvData = {
  profile: {
    fullName: "Gabriel David Díaz Garavito",
    shortName: "Gabriel Díaz",
    role: "Tecnólogo en Desarrollo de Software",
    company: "Don Prueba",
    tagline: "Diseño y construyo agentes de IA y automatizaciones que reemplazan tareas repetitivas en empresas.",
    location: "Bogotá, Colombia",
    phone: "+57 320 811 2607",
    email: "gddiazga@gmail.com",
    github: "https://github.com/zahirbombap-hub",
    linkedin: "https://www.linkedin.com/in/gabriel-david-diaz-garavito-3a013b2a0/",
  },
  about: [
    "Soy desarrollador de software con base técnica en Python, React y C++, y un foco claro en automatización con IA. Combino integración de LLMs y APIs externas con herramientas como ZeroClaw para construir agentes conversacionales y pipelines que reemplazan tareas repetitivas en empresas reales.",
    "Mi diferencial es el cruce entre lo industrial y lo moderno: vengo de validar sistemas de telemedida con DLMS/COSEM, Modbus y TCP/IP en laboratorio, y aplico esa misma rigurosidad diagnóstica a las automatizaciones con IA que entrego en Don Prueba.",
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
    },
  ],
  skills: [
    { category: "Frontend", items: ["React (85%)", "Angular (75%)", "JavaScript/TypeScript (80%)", "HTML/CSS (90%)", "Tailwind CSS (85%)"] },
    { category: "Backend / Lenguajes", items: ["Python (88%)", "C++ (70%)", "Delphi (75%)", ".NET Framework (70%)"] },
    { category: "Automatización & IA", items: ["Agentes conversacionales LLMs (88%)", "ZeroClaw (75%)", "Integración APIs de IA (85%)", "Procesamiento de datos (80%)"] },
    { category: "Datos", items: ["Oracle (75%)", "SQL Server (78%)", "Modelado relacional (75%)"] },
    { category: "Industrial", items: ["DLMS/COSEM (80%)", "Modbus (78%)", "TCP/IP (80%)", "Telemedida (75%)"] },
  ],
  projects: [
    { title: "Agente de Correos UNINPAHU", desc: "Agente conversacional que automatiza la clasificación y respuesta de correos académicos integrando un LLM con la infraestructura de correo institucional." },
    { title: "Scraper SECOP 2", desc: "Sistema que scrapea contratos gubernamentales de Colombia (SECOP 2) para buscar irregularidades y exponer patrones de corrupción." },
    { title: "Don Prueba — Sitio corporativo", desc: "Landing, automatizaciones, apps y artículos. React 19 + Tailwind + Cloudflare Pages." },
    { title: "Organizador de archivos en la nube", desc: "Automatización que organiza archivos en Google Drive y Azure OneDrive según reglas configurables." },
  ],
  education: [
    { institution: "UNINPAHU", title: "Tecnólogo en Desarrollo de Software", period: "2022 — 2026" },
    { institution: "SENA", title: "Técnico en Programación de Software", period: "2020 — 2021" },
  ],
};

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CV - ${escapeHtml(cvData.profile.shortName)}</title>
<style>
  @page { margin: 0; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 9.5pt;
    line-height: 1.5;
    color: #1f2328;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 35% 65%;
  }
  .sidebar {
    background: #0d1117;
    color: #e6edf3;
    padding: 32px 24px;
  }
  .main {
    padding: 32px 28px;
  }
  .name {
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: -0.3pt;
    line-height: 1.2;
    margin-bottom: 4px;
    color: white;
  }
  .role {
    font-size: 8pt;
    font-weight: 500;
    color: #58a6ff;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    margin-bottom: 20px;
  }
  .tagline {
    font-size: 7.5pt;
    color: #8b949e;
    line-height: 1.5;
    margin-bottom: 24px;
  }
  .section-title {
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    color: #58a6ff;
    margin-bottom: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid #30363d;
  }
  .main .section-title {
    color: #0969da;
    border-bottom-color: #d0d7de;
  }
  .contact-item {
    font-size: 7.5pt;
    color: #c9d1d9;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .contact-item svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    fill: #8b949e;
  }
  .skill-group {
    margin-bottom: 14px;
  }
  .skill-category {
    font-size: 7pt;
    font-weight: 600;
    color: #58a6ff;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    margin-bottom: 4px;
  }
  .skill-items {
    font-size: 7pt;
    color: #c9d1d9;
    line-height: 1.6;
  }
  .main-section {
    margin-bottom: 20px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  .job-role {
    font-size: 10pt;
    font-weight: 700;
    color: #1f2328;
  }
  .job-company {
    font-size: 9pt;
    font-weight: 600;
    color: #0969da;
  }
  .job-period {
    font-size: 7.5pt;
    color: #656d76;
    white-space: nowrap;
  }
  .job-location {
    font-size: 7pt;
    color: #656d76;
    margin-bottom: 6px;
  }
  ul { list-style: none; padding: 0; }
  li {
    font-size: 7.5pt;
    color: #323743;
    padding-left: 14px;
    position: relative;
    margin-bottom: 3px;
    line-height: 1.5;
  }
  li::before {
    content: "•";
    position: absolute;
    left: 3px;
    color: #0969da;
    font-weight: bold;
  }
  .project-item {
    margin-bottom: 10px;
  }
  .project-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #1f2328;
  }
  .project-desc {
    font-size: 7pt;
    color: #656d76;
    line-height: 1.4;
  }
  .edu-item {
    margin-bottom: 10px;
  }
  .edu-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #1f2328;
  }
  .edu-institution {
    font-size: 7.5pt;
    color: #0969da;
    font-weight: 500;
  }
  .edu-period {
    font-size: 7pt;
    color: #656d76;
  }
  .about-text {
    font-size: 7.5pt;
    color: #323743;
    line-height: 1.6;
    margin-bottom: 6px;
  }
  .separator {
    height: 1px;
    background: linear-gradient(90deg, transparent, #30363d, transparent);
    margin: 16px 0;
  }
  @media print {
    body { background: white; }
    .sidebar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="sidebar">
    <div class="name">${escapeHtml(cvData.profile.shortName)}</div>
    <div class="role">${escapeHtml(cvData.profile.role)}</div>
    <div class="tagline">${escapeHtml(cvData.profile.tagline)}</div>

    <div class="section-title">Contacto</div>
    <div class="contact-item">
      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      ${escapeHtml(cvData.profile.location)}
    </div>
    <div class="contact-item">
      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      ${escapeHtml(cvData.profile.email)}
    </div>
    <div class="contact-item">
      <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      ${escapeHtml(cvData.profile.phone)}
    </div>
    <div class="contact-item">
      <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.18c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23 11.5 0 6 0 6 0 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>
      /zahirbombap-hub
    </div>
    <div class="contact-item">
      <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
      /in/gabriel-david-diaz-garavito
    </div>

    <div class="separator"></div>

    <div class="section-title">Habilidades</div>
    ${cvData.skills.map(g => `
    <div class="skill-group">
      <div class="skill-category">${escapeHtml(g.category)}</div>
      <div class="skill-items">${g.items.map(i => escapeHtml(i)).join(' · ')}</div>
    </div>
    `).join('')}

    <div class="separator"></div>

    <div class="section-title">Educación</div>
    ${cvData.education.map(e => `
    <div class="edu-item">
      <div class="edu-period">${escapeHtml(e.period)}</div>
      <div style="font-weight:600;font-size:8pt;color:white;margin:2px 0">${escapeHtml(e.title)}</div>
      <div style="font-size:7pt;color:#8b949e">${escapeHtml(e.institution)}</div>
    </div>
    `).join('')}
  </div>

  <div class="main">
    <div class="main-section">
      <div class="section-title">Acerca de mí</div>
      ${cvData.about.map(p => `<p class="about-text">${escapeHtml(p)}</p>`).join('')}
    </div>

    <div class="main-section">
      <div class="section-title">Experiencia Laboral</div>
      ${cvData.experience.map(job => `
      <div style="margin-bottom:14px">
        <div class="job-header">
          <div>
            <div class="job-role">${escapeHtml(job.role)}</div>
            <div class="job-company">${escapeHtml(job.company)}</div>
          </div>
          <div class="job-period">${escapeHtml(job.period)}</div>
        </div>
        <div class="job-location">${escapeHtml(job.location)}</div>
        <ul>
          ${job.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>

    <div class="main-section">
      <div class="section-title">Proyectos Destacados</div>
      ${cvData.projects.map(p => `
      <div class="project-item">
        <div class="project-title">${escapeHtml(p.title)}</div>
        <div class="project-desc">${escapeHtml(p.desc)}</div>
      </div>
      `).join('')}
    </div>

    <div style="margin-top:24px;padding-top:12px;border-top:1px solid #d0d7de;font-size:6.5pt;color:#656d76;text-align:center;">
      ${escapeHtml(cvData.profile.fullName)} · ${escapeHtml(cvData.profile.email)} · ${escapeHtml(cvData.profile.phone)}<br>
      Generado el ${new Date().toLocaleDateString('es-ES')}
    </div>
  </div>
</div>
</body>
</html>`;

const outPath = 'public/cv-gabriel-diaz-es.html';
writeFileSync(outPath, html, 'utf-8');
console.log('CV HTML generado:', outPath);
console.log('Abrelo en el navegador y presiona Ctrl+P → "Guardar como PDF"');

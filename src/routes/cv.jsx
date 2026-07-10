import { RouteSeo } from "../components/Seo.jsx";
import { cvData } from "../components/cv/cvData.js";
import { CvHeader } from "../components/cv/CvHeader.jsx";
import { CvHero } from "../components/cv/CvHero.jsx";
import { CvAbout } from "../components/cv/CvAbout.jsx";
import { CvExperience } from "../components/cv/CvExperience.jsx";
import { CvSkills } from "../components/cv/CvSkills.jsx";
import { CvSkillsRadar } from "../components/cv/CvSkillsRadar.jsx";
import { CvProjects } from "../components/cv/CvProjects.jsx";
import { CvEducation } from "../components/cv/CvEducation.jsx";
import { CvContact } from "../components/cv/CvContact.jsx";
import { CvGitHubActivity } from "../components/cv/CvGitHubActivity.jsx";
import { GabrielBot } from "../components/chat/GabrielBot.jsx";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cvData.profile.fullName,
  alternateName: cvData.profile.shortName,
  jobTitle: cvData.profile.role,
  worksFor: {
    "@type": "Organization",
    name: cvData.profile.company,
    url: "https://donprueba.online"
  },
  url: "https://donprueba.online/cv",
  email: cvData.profile.email,
  telephone: cvData.profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO"
  },
  sameAs: [cvData.profile.github, cvData.profile.linkedin],
  knowsAbout: [
    "Inteligencia Artificial",
    "Automatización de procesos",
    "Large Language Models",
    "Agentes conversacionales",
    "Python",
    "React",
    "TypeScript",
    "DLMS/COSEM",
    "Modbus",
    "Telemedida"
  ]
};

export default function Cv() {
  return (
    <div className="cv-page-bg relative min-h-screen">
      <RouteSeo routePath="/cv" structuredData={[personSchema]} />

      <CvHeader />

      <main className="pt-16">
        <CvHero />
        <CvAbout />
        <section id="cv-experiencia">
          <CvExperience />
        </section>
        <CvSkills />
        <CvSkillsRadar />
        <CvProjects />
        <CvEducation />
        <section id="cv-github">
          <CvGitHubActivity />
        </section>
        <section id="cv-contacto">
          <CvContact />
        </section>
      </main>

      <footer className="border-t border-border-subtle py-8">
        <div className="mx-auto max-w-cv px-4 md:px-8">
          <p className="text-center text-xs font-mono text-text-muted">
            {"\u00A9 " + new Date().getFullYear()} Gabriel Díaz · Construido con React · {" "}
            <a
              href="https://donprueba.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Don Prueba
            </a>
          </p>
        </div>
      </footer>

      <GabrielBot />
    </div>
  );
}

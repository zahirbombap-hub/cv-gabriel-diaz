import { RouteSeo } from "../components/Seo.jsx";
import { cvData } from "../components/cv/cvData.js";
import { CvHero } from "../components/cv/CvHero.jsx";
import { CvAbout } from "../components/cv/CvAbout.jsx";
import { CvExperience } from "../components/cv/CvExperience.jsx";
import { CvSkills } from "../components/cv/CvSkills.jsx";
import { CvProjects } from "../components/cv/CvProjects.jsx";
import { CvEducation } from "../components/cv/CvEducation.jsx";
import { CvContact } from "../components/cv/CvContact.jsx";
import { CvThemeToggle } from "../components/cv/CvThemeToggle.jsx";

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

      <div className="fixed right-4 top-4 z-40 md:right-6 md:top-6">
        <CvThemeToggle />
      </div>

      <main>
        <CvHero />
        <CvAbout />
        <CvExperience />
        <CvSkills />
        <CvProjects />
        <CvEducation />
        <CvContact />
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
    </div>
  );
}

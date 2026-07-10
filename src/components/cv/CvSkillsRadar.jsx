import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { cvData } from './cvData.js';
import { BlurFade } from '../ui/blur-fade.jsx';

const CATEGORY_COLORS = ['#58a6ff', '#3fb950', '#f0883e', '#d2a8ff', '#f778ba'];

function flattenSkills(skills) {
  const seen = new Set();
  const result = [];
  for (const group of skills) {
    for (const skill of group.items) {
      const key = skill.name.split('/')[0].trim();
      if (!seen.has(key)) {
        seen.add(key);
        result.push({ skill: key, level: skill.level });
      }
    }
  }
  return result;
}

export function CvSkillsRadar() {
  const { skills } = cvData;
  const data = flattenSkills(skills);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <BlurFade inView inViewMargin="-80px" className="py-12 md:py-20">
      <div className="mx-auto max-w-cv px-4 md:px-8">
        <BlurFade inView delay={0.05}>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            Radiografía técnica
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Panorama de habilidades
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="mb-10 max-w-2xl text-base text-text-secondary md:text-lg">
            Vista general del stack técnico. Cada eje es una habilidad clave.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="cv-card mx-auto max-w-lg p-6"
          >
            <ResponsiveContainer width="100%" height={380}>
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fontSize: 11,
                    fill: 'var(--text-secondary)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  formatter={(value) => [`${value}%`, 'Nivel']}
                />
                <Radar
                  name="Habilidades"
                  dataKey="level"
                  stroke="var(--accent-primary)"
                  fill="var(--accent-primary)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {skills.map((group, i) => (
                <button
                  key={group.category}
                  type="button"
                  onMouseEnter={() => setActiveCategory(group.category)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor:
                      activeCategory === group.category
                        ? CATEGORY_COLORS[i] + '30'
                        : 'var(--bg-surface)',
                    color: CATEGORY_COLORS[i],
                    border: '1px solid',
                    borderColor:
                      activeCategory === group.category
                        ? CATEGORY_COLORS[i] + '50'
                        : 'var(--border-subtle)',
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[i] }}
                  />
                  {group.category}
                </button>
              ))}
            </div>
          </motion.div>
        </BlurFade>
      </div>
    </BlurFade>
  );
}

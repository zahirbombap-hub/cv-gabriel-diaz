import { useState } from 'react';
import { useGitHubContributions } from '../../hooks/useGitHubContributions.js';
import { BlurFade } from '../ui/blur-fade.jsx';

const DAY_NAMES = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

function getMonthCols(weeks) {
  if (!weeks || weeks.length === 0) return [];
  const cols = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.contributionDays.find((d) => d.date);
    if (!firstReal) { cols.push(''); return; }
    const m = new Date(firstReal.date + 'T00:00:00').getMonth();
    cols.push(m !== lastMonth ? MONTH_NAMES[m] : '');
    lastMonth = m;
  });
  return cols;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function Tooltip({ x, y, count, date, visible }) {
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg"
      style={{
        left: x,
        top: y - 36,
        transform: 'translateX(-50%)',
        background: 'var(--bg-elevated)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {count > 0 ? `${count} contribución${count !== 1 ? 'es' : ''}` : 'Sin contribuciones'} el {formatDate(date)}
    </div>
  );
}

function Cell({ count, level, date, onHover, onLeave }) {
  if (!date) {
    return <td style={{ width: 13, height: 13 }} />;
  }
  return (
    <td
      onMouseEnter={(e) => onHover(e, count, date)}
      onMouseLeave={onLeave}
      onFocus={(e) => onHover(e, count, date)}
      onBlur={onLeave}
      tabIndex={0}
      aria-label={`${count > 0 ? count + ' contribuciones' : 'Sin contribuciones'} el ${formatDate(date)}`}
      className="contrib-cell"
      data-level={level}
      style={{
        width: 13,
        height: 13,
        borderRadius: 2,
        outline: 'none',
        cursor: 'pointer',
      }}
    />
  );
}

export function CvGitHubActivity() {
  const { data, loading, error, refetch } = useGitHubContributions();
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, count: 0, date: '', visible: false });

  const weeks = data?.weeks || [];
  const total = data?.totalContributions ?? 0;
  const monthCols = getMonthCols(weeks);

  const handleHover = (e, count, date) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({ x: rect.left + rect.width / 2, y: rect.top, count, date, visible: true });
  };

  const handleLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const visible = !loading && !error;

  return (
    <BlurFade inView inViewMargin="-80px">
      <section className="mx-auto max-w-cv px-4 py-20 md:px-8" aria-label="Actividad de GitHub">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Actividad en GitHub
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Contribuciones en el último año
          </p>
        </div>

        <div className="cv-card overflow-hidden p-6 md:p-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div
                className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent"
                role="status"
                aria-label="Cargando contribuciones"
              />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-sm text-warm">{error}</p>
              <button
                onClick={refetch}
                className="cv-focusable rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                Reintentar
              </button>
            </div>
          )}

          {visible && (
            <>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-primary tabular-nums">{total}</span>
                <span className="text-sm text-text-muted">
                  contribuciones en el último año
                </span>
              </div>

              <div className="overflow-x-auto" style={{ margin: '0 -4px' }}>
                <table
                  role="grid"
                  aria-label="Calendario de contribuciones"
                  style={{ borderSpacing: 3, borderCollapse: 'separate', fontSize: 0 }}
                >
                  <thead>
                    <tr>
                      <td style={{ width: 30, height: 14 }} />
                      {monthCols.map((label, wi) => (
                        <td
                          key={wi}
                          style={{
                            width: 13,
                            height: 14,
                            padding: 0,
                            verticalAlign: 'bottom',
                            fontSize: 10,
                            color: 'var(--text-muted)',
                            fontWeight: 500,
                          }}
                        >
                          {label}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                      <tr key={dayIndex}>
                        <td
                          style={{
                            width: 30,
                            height: 13,
                            padding: 0,
                            fontSize: 10,
                            color: 'var(--text-muted)',
                            lineHeight: '13px',
                            verticalAlign: 'middle',
                          }}
                        >
                          {DAY_NAMES[dayIndex]}
                        </td>
                        {weeks.map((week, wi) => {
                          const day = week.contributionDays[dayIndex];
                          return (
                            <Cell
                              key={`${wi}-${dayIndex}`}
                              count={day?.count ?? 0}
                              level={day?.level ?? 0}
                              date={day?.date ?? ''}
                              onHover={handleHover}
                              onLeave={handleLeave}
                            />
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-end gap-1" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                <span>Menos</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className="contrib-cell inline-block rounded-sm"
                    data-level={lvl}
                    aria-hidden="true"
                    style={{ width: 12, height: 12 }}
                  />
                ))}
                <span>Más</span>
              </div>

              <Tooltip
                x={tooltip.x}
                y={tooltip.y}
                count={tooltip.count}
                date={tooltip.date}
                visible={tooltip.visible}
              />

              <div className="mt-4 border-t border-border-subtle pt-3 text-center">
                <a
                  href="https://github.com/zahirbombap-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline"
                >
                  Ver perfil completo en GitHub →
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </BlurFade>
  );
}

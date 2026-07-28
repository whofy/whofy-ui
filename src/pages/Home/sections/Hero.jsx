import styles from './Hero.module.css';

export default function Hero({ onPickFile }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h1 className={styles.h1}>We hunt <em>opportunity</em> for you.</h1>
            <p className={styles.subtitle}>Upload your resume once. Whofy reads your skills, understands your experience, and delivers a ranked shortlist of live openings across India — in seconds.</p>
            <div className={styles.ctaRow}>
              <button type="button" className="btn btn-theme btn-lg" onClick={onPickFile}>
                Upload your resume
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.mockup} aria-hidden="true">
            <svg viewBox="0 0 620 510" xmlns="http://www.w3.org/2000/svg" fill="none">
              <defs>
                <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0"/>
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/>
                </linearGradient>
              </defs>

              <rect x="20" y="30" width="580" height="460" rx="24" fill="#ffffff" stroke="var(--border)" strokeWidth="1"/>
              <rect x="20" y="30" width="580" height="52" rx="24" fill="var(--bg-subtle)"/>
              <rect x="20" y="76" width="580" height="6" fill="var(--border-subtle)"/>
              <circle cx="46" cy="56" r="6" fill="#e11d48" opacity="0.7"/>
              <circle cx="66" cy="56" r="6" fill="#f59e0b" opacity="0.7"/>
              <circle cx="86" cy="56" r="6" fill="#10b981" opacity="0.7"/>
              <rect x="220" y="47" width="180" height="18" rx="9" fill="#fff" stroke="var(--border)"/>
              <text x="310" y="61" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="500" fill="var(--text-muted)">whofy.app/match</text>

              <g transform="translate(50, 108)">
                <rect width="210" height="350" rx="14" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                <circle cx="32" cy="36" r="18" fill="var(--primary-tint)"/>
                <circle cx="32" cy="30" r="7" fill="var(--primary)"/>
                <path d="M23 43 a 9 9 0 0 1 18 0" fill="var(--primary)"/>
                <rect x="62" y="22" width="100" height="10" rx="5" fill="var(--text)" opacity="0.8"/>
                <rect x="62" y="38" width="68" height="7" rx="3.5" fill="var(--text-muted)" opacity="0.45"/>
                <rect x="20" y="72" width="60" height="8" rx="4" fill="var(--primary)" opacity="0.8"/>
                <rect x="20" y="90" width="170" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="101" width="170" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="112" width="130" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="138" width="75" height="8" rx="4" fill="var(--primary)" opacity="0.8"/>
                <rect x="20" y="156" width="170" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="167" width="150" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="178" width="120" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="206" width="42" height="8" rx="4" fill="var(--primary)" opacity="0.8"/>
                <rect x="20" y="226" width="46" height="20" rx="10" fill="var(--primary-tint)"/>
                <text x="43" y="239" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="var(--primary)">React</text>
                <rect x="72" y="226" width="56" height="20" rx="10" fill="var(--primary-tint)"/>
                <text x="100" y="239" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="var(--primary)">Python</text>
                <rect x="134" y="226" width="38" height="20" rx="10" fill="var(--primary-tint)"/>
                <text x="153" y="239" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="var(--primary)">SQL</text>
                <rect x="20" y="252" width="36" height="20" rx="10" fill="var(--primary-tint)"/>
                <text x="38" y="265" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="var(--primary)">Git</text>
                <rect x="62" y="252" width="70" height="20" rx="10" fill="var(--primary-tint)"/>
                <text x="97" y="265" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="var(--primary)">HTML/CSS</text>
                <rect x="20" y="292" width="170" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="303" width="145" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect x="20" y="314" width="160" height="5" rx="2.5" fill="var(--border-strong)"/>
                <rect className="mockup-scan" x="10" y="100" width="190" height="3" rx="1.5" fill="var(--primary)" opacity="0.8"/>
              </g>

              <path className="flow-path flow-path-1" d="M260 230 C290 230, 320 170, 370 170" stroke="url(#flowGrad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path className="flow-path flow-path-2" d="M260 280 C300 280, 330 290, 370 290" stroke="url(#flowGrad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path className="flow-path flow-path-3" d="M260 330 C290 330, 320 400, 370 400" stroke="url(#flowGrad)" strokeWidth="2" strokeLinecap="round" fill="none"/>

              <circle className="flow-dot flow-dot-1" r="3" fill="var(--primary)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M260 230 C290 230, 320 170, 370 170" begin="0s"/>
              </circle>
              <circle className="flow-dot flow-dot-2" r="3" fill="var(--primary)">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M260 280 C300 280, 330 290, 370 290" begin="0.4s"/>
              </circle>
              <circle className="flow-dot flow-dot-3" r="3" fill="var(--primary)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M260 330 C290 330, 320 400, 370 400" begin="0.8s"/>
              </circle>

              <g transform="translate(310, 280)">
                <circle className="mockup-orb-glow" r="36" fill="var(--primary)" opacity="0.06"/>
                <circle className="mockup-orb" r="28" fill="var(--primary-tint)" filter="url(#orbGlow)"/>
                <circle r="20" fill="#fff" stroke="var(--primary)" strokeWidth="2"/>
                <path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="var(--primary)"/>
                <circle className="orb-ring" r="26" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 6" opacity="0.3"/>
              </g>

              <g className="mockup-card">
                <g transform="translate(378, 120)">
                  <rect width="200" height="100" rx="12" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                  <rect x="14" y="14" width="34" height="34" rx="8" fill="var(--primary)"/>
                  <text x="31" y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#fff">Z</text>
                  <text x="56" y="28" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Frontend Developer</text>
                  <text x="56" y="42" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="var(--text-muted)">Zerodha · Bengaluru</text>
                  <rect x="14" y="60" width="36" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="32" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">React</text>
                  <rect x="54" y="60" width="30" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="69" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">CSS</text>
                  <rect x="88" y="60" width="24" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="100" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">JS</text>
                  <rect x="14" y="84" width="172" height="5" rx="2.5" fill="var(--border-subtle)"/>
                  <rect x="14" y="84" width="160" height="5" rx="2.5" fill="#10b981"/>
                </g>
              </g>

              <g className="mockup-card mockup-card-b">
                <g transform="translate(378, 238)">
                  <rect width="200" height="100" rx="12" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                  <rect x="14" y="14" width="34" height="34" rx="8" fill="#057642"/>
                  <text x="31" y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#fff">F</text>
                  <text x="56" y="28" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Software Engineer</text>
                  <text x="56" y="42" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="var(--text-muted)">Freshworks · Chennai</text>
                  <rect x="14" y="60" width="30" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="29" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">Java</text>
                  <rect x="48" y="60" width="28" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="62" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">SQL</text>
                  <rect x="80" y="60" width="26" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="93" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">Git</text>
                  <rect x="14" y="84" width="172" height="5" rx="2.5" fill="var(--border-subtle)"/>
                  <rect x="14" y="84" width="140" height="5" rx="2.5" fill="var(--primary)"/>
                </g>
              </g>

              <g className="mockup-card mockup-card-c">
                <g transform="translate(378, 356)">
                  <rect width="200" height="100" rx="12" fill="#fff" stroke="var(--border)" strokeWidth="1.5"/>
                  <rect x="14" y="14" width="34" height="34" rx="8" fill="#b45309"/>
                  <text x="31" y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#fff">R</text>
                  <text x="56" y="28" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="var(--text)">Backend Intern</text>
                  <text x="56" y="42" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="500" fill="var(--text-muted)">Razorpay · Remote</text>
                  <rect x="14" y="60" width="42" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="35" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">Python</text>
                  <rect x="60" y="60" width="40" height="16" rx="4" fill="var(--primary-tint)"/>
                  <text x="80" y="71" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="var(--primary)">FastAPI</text>
                  <rect x="14" y="84" width="172" height="5" rx="2.5" fill="var(--border-subtle)"/>
                  <rect x="14" y="84" width="120" height="5" rx="2.5" fill="var(--primary)"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import styles from './Integrations.module.css';

const SOURCES = [
  { name: 'Greenhouse', id: 'greenhouse', color: 'linear-gradient(135deg, #00B289, #008B6B)' },
  { name: 'Naukri', id: 'naukri', color: 'linear-gradient(135deg, #FF7A59, #FF5C35)' },
  { name: 'Workday', id: 'workday', color: 'linear-gradient(135deg, #005CB9, #00458C)' },
  { name: 'Lever', id: 'lever', color: 'linear-gradient(135deg, #384054, #2A3141)' },
  { name: 'LinkedIn', id: 'linkedin', color: 'linear-gradient(135deg, #0A66C2, #004182)' },
  { name: 'Indeed', id: 'indeed', color: 'linear-gradient(135deg, #2164f4, #184dbf)' },
  { name: 'Ashby', id: 'ashby', color: 'linear-gradient(135deg, #7C3AED, #5B21B6)' },
  { name: 'iCIMS', id: 'icims', color: 'linear-gradient(135deg, #E11931, #B91024)' },
  { name: 'Taleo', id: 'taleo', color: 'linear-gradient(135deg, #C74634, #9E3526)' },
  { name: 'SmartRecruiters', id: 'smartrecruiters', color: 'linear-gradient(135deg, #4A90E2, #357ABD)' },
  { name: 'Breezy HR', id: 'breezy', color: 'linear-gradient(135deg, #10B981, #059669)' },
  { name: 'Workable', id: 'workable', color: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }
];

function LogoIcon({ source }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.logo} style={{ background: source.color }}>
        {source.name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={`/logos/${source.id}.svg`}
      alt={`${source.name} logo`}
      className={styles.realLogo}
      onError={() => setHasError(true)}
    />
  );
}

export default function Integrations() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2>Connects with your favorite data sources.</h2>
          <p>Whofy pulls in your applications and job descriptions directly from the platforms you already use.</p>
        </div>
      </div>
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {SOURCES.map((source, i) => (
              <div key={`t1-${i}`} className={styles.pill}>
                <LogoIcon source={source} />
                <span>{source.name}</span>
              </div>
            ))}
          </div>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {SOURCES.map((source, i) => (
              <div key={`t2-${i}`} className={styles.pill}>
                <LogoIcon source={source} />
                <span>{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

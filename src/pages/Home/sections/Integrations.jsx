import { useState } from 'react';
import styles from './Integrations.module.css';

const ROW1 = [
  { name: 'Greenhouse', id: 'greenhouse', ext: 'png', color: 'linear-gradient(135deg, #24A47F, #1B7D60)' },
  { name: 'Lever', id: 'lever', ext: 'svg', color: 'linear-gradient(135deg, #384054, #2A3141)' },
  { name: 'RemoteOK', id: 'remoteok', ext: 'png', color: 'linear-gradient(135deg, #F4C20D, #D4A80A)' },
  { name: 'Adzuna', id: 'adzuna', ext: 'png', color: 'linear-gradient(135deg, #B4D455, #8FB33A)' },
  { name: 'Ashby', id: 'ashby', ext: 'png', color: 'linear-gradient(135deg, #6C2BD9, #5521AB)' },
  { name: 'Workday', id: 'workday', ext: 'png', color: 'linear-gradient(135deg, #005CB9, #00458C)' },
  { name: 'Hacker News', id: 'hackernews', ext: 'svg', color: 'linear-gradient(135deg, #FF6600, #E05500)' },
  { name: 'Himalayas', id: 'himalayas', ext: 'png', color: 'linear-gradient(135deg, #1E3A5F, #2A5080)' },
  { name: 'We Work Remotely', id: 'weworkremotely', ext: 'png', color: 'linear-gradient(135deg, #0E1B3D, #1A2D5A)' }
];

const ROW2 = [
  { name: 'Hacker News', id: 'hackernews', ext: 'svg', color: 'linear-gradient(135deg, #FF6600, #E05500)' },
  { name: 'We Work Remotely', id: 'weworkremotely', ext: 'png', color: 'linear-gradient(135deg, #0E1B3D, #1A2D5A)' },
  { name: 'Ashby', id: 'ashby', ext: 'png', color: 'linear-gradient(135deg, #6C2BD9, #5521AB)' },
  { name: 'Workday', id: 'workday', ext: 'png', color: 'linear-gradient(135deg, #005CB9, #00458C)' },
  { name: 'Greenhouse', id: 'greenhouse', ext: 'png', color: 'linear-gradient(135deg, #24A47F, #1B7D60)' },
  { name: 'Himalayas', id: 'himalayas', ext: 'png', color: 'linear-gradient(135deg, #1E3A5F, #2A5080)' },
  { name: 'RemoteOK', id: 'remoteok', ext: 'png', color: 'linear-gradient(135deg, #F4C20D, #D4A80A)' },
  { name: 'Lever', id: 'lever', ext: 'svg', color: 'linear-gradient(135deg, #384054, #2A3141)' },
  { name: 'Adzuna', id: 'adzuna', ext: 'png', color: 'linear-gradient(135deg, #B4D455, #8FB33A)' }
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
      src={`/logos/${source.id}.${source.ext}`}
      alt={`${source.name} logo`}
      className={styles.realLogo}
      onError={() => setHasError(true)}
    />
  );
}

function MarqueeRow({ sources, direction }) {
  const cls = direction === 'right' ? styles.trackRight : styles.trackLeft;
  return (
    <div className={styles.row}>
      <div className={cls}>
        {sources.map((s, i) => (
          <div key={`a-${i}`} className={styles.pill}>
            <LogoIcon source={s} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
      <div className={cls} aria-hidden="true">
        {sources.map((s, i) => (
          <div key={`b-${i}`} className={styles.pill}>
            <LogoIcon source={s} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
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
      <div className={styles.marquee}>
        <MarqueeRow sources={ROW1} direction="left" />
        <MarqueeRow sources={ROW2} direction="right" />
      </div>
    </section>
  );
}

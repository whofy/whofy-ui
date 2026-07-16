import { Link } from 'react-router-dom';
import styles from './Careers.module.css';

const VALUES = [
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>),
    title: 'Candidate First',
    body: 'Every decision we make starts with asking: "Does this make the job hunt easier for candidates?" If it creates friction, we don\'t build it.' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>),
    title: 'Move Fast',
    body: 'We iterate quickly. We prefer shipping a good feature today over a perfect feature next month. Speed is our competitive advantage.' },
  { icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>),
    title: 'Radical Transparency',
    body: 'From match scores to salary insights, we believe in open data. We operate the exact same way internally with our own team.' }
];

const ROLES = [
  { title: 'Senior Full-Stack Engineer', meta: 'Engineering • Remote (India) or Bangalore' },
  { title: 'Machine Learning Engineer (NLP)', meta: 'Data • Bangalore' }
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  );
}

export default function Careers() {
  return (
    <>
      <section className={`${styles.hero} container`}>
        <h1 className={styles.pageHeader}>Join the mission to hunt opportunity.</h1>
        <p>We're building the infrastructure that connects India's next generation of engineers, designers, and analysts with roles where they truly belong.</p>
      </section>

      <section className={styles.values}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How we operate</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                {v.icon}
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.roles}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <div className={styles.rolesList}>
            {ROLES.map((r, i) => (
              <a key={i} href="#" className={styles.roleCard}>
                <div className={styles.roleInfo}>
                  <h4>{r.title}</h4>
                  <p>{r.meta}</p>
                </div>
                <div className={styles.roleAction}>
                  View Role <Arrow />
                </div>
              </a>
            ))}
            <div className={styles.generalApp}>
              <h4>Don't see a fit?</h4>
              <p>We're a resume-first platform. Upload yours, and if there's a match internally, we'll reach out.</p>
              <Link to="/" className="btn btn-theme">Drop your resume</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

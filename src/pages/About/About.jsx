import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO.jsx';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <SEO title="About" description="Learn how Whofy works, our mission to make job hunting easier, and the values we stand by." />
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.eyebrow}>About Whofy</div>
          <h1 className={styles.pageHeader}>Built for the way you actually job hunt.</h1>
          <p className={styles.subtitle}>
            Whofy started with a simple frustration: job boards make you do all the work.
            You fill out endless filters, wade through irrelevant listings, and still miss the roles that
            genuinely fit you. So we flipped it around. You drop your resume, and we hunt the openings for you.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div>
              <div className={styles.smallEyebrow}>Our mission</div>
              <h2>Make the right job easier to find than the wrong one.</h2>
            </div>
            <p>
              Job boards make everyone do the same work. Scroll endlessly, tweak filters, and hope
              something relevant shows up. Whether you're starting out or switching roles, the tools
              haven't changed in a decade. We're building a resume-first platform where the ranking
              is honest, the shortlist is short, and the roles are real.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <div className={styles.head}>
            <div className={styles.eyebrow}>What we care about</div>
            <h2>Three things we won't compromise on.</h2>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>01</div>
              <h3>Your data stays yours</h3>
              <p>Parsed, matched, and forgotten in one session. No storage, no selling, no spam.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>02</div>
              <h3>No ghost postings</h3>
              <p>New roles are added daily. The full database is refreshed every 28 days.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>03</div>
              <h3>Built for every job seeker</h3>
              <p>Fresher or senior, Whofy matches your skills to roles that actually fit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to see your shortlist?</h2>
            <p>Upload your resume and get a ranked list of live openings in under a minute.</p>
            <Link to="/" className="btn btn-theme btn-lg">
              Get started
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

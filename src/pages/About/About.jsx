import { Link } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.eyebrow}>About Whofy</div>
          <h1 className={styles.pageHeader}>Built for the way you actually job hunt.</h1>
          <p className={styles.subtitle}>
            Whofy started with a simple frustration: job boards make you do all the work.
            You fill out endless filters, wade through irrelevant listings, and still miss the roles that
            genuinely fit you. So we flipped it around — you drop your resume, and we hunt the openings for you.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div>
              <div className={styles.smallEyebrow}>Our mission</div>
              <h2>Make the first job easier to find than the wrong one.</h2>
            </div>
            <p>
              India adds millions of freshers to the workforce every year, but the tools they use to find work
              were built for people who already have five years of experience. We're building a resume-first
              platform where the ranking is honest, the shortlist is short, and the roles are real.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.head}>
            <div className={styles.eyebrow}>How matching works</div>
            <h2>What actually happens when you upload your resume.</h2>
            <p>No black box, no keyword tricks — just a straightforward pipeline that reads your resume the way a good recruiter would.</p>
          </div>

          <div className={styles.pipelineGrid}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3>1. We read your resume</h3>
              <p>Your PDF or DOCX is parsed in-memory. We pull out your skills, roles, projects, education, and years of experience — the same way a recruiter would skim your first page.</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 11a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 2Z" />
                  <path d="M17.5 6.5A4.5 4.5 0 0 1 22 11a4.5 4.5 0 0 1-4.5 4.5" />
                  <path d="M6.5 6.5A4.5 4.5 0 0 0 2 11a4.5 4.5 0 0 0 4.5 4.5" />
                  <path d="M7.5 15.5A4.5 4.5 0 0 0 12 20a4.5 4.5 0 0 0 4.5-4.5" />
                </svg>
              </div>
              <h3>2. We understand the meaning, not just the words</h3>
              <p>ReactJS ≈ React ≈ front-end. Python ≈ Django ≈ backend. Instead of matching keywords literally, we map your skills to a semantic graph so you don't lose out on a role just because your resume phrased it differently.</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 12l4-2" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3>3. We score every live opening</h3>
              <p>Each open role in our database is scored against your profile — skill overlap, seniority match, location fit, and role fit are all weighted together. The strongest matches float to the top.</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="10" y1="6" x2="21" y2="6" />
                  <line x1="10" y1="12" x2="21" y2="12" />
                  <line x1="10" y1="18" x2="21" y2="18" />
                  <path d="M4 6h1v4" />
                  <path d="M4 10h2" />
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>
              </div>
              <h3>4. We show you why each match fits</h3>
              <p>Every job card on your shortlist highlights the exact skills that lined up with the role. No black-box scores — you understand your matches as well as the recruiter does.</p>
            </div>
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
              <div className={styles.valueMark}>①</div>
              <h3>Your data stays yours</h3>
              <p>Your resume is parsed, matched, and forgotten in one session. We don't store your PDF, we don't sell your data, and we don't email you spam.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueMark}>②</div>
              <h3>No ghost postings</h3>
              <p>Every role on Whofy is refreshed daily. If a company has closed a listing, it disappears from your shortlist within 48 hours.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueMark}>③</div>
              <h3>Made for freshers first</h3>
              <p>Zero to two years of experience is our whole focus. Every partner company on Whofy has an active early-career track.</p>
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

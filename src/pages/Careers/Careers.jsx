import { useRef, useState } from 'react';
import styles from './Careers.module.css';
import Dropdown from '../../components/Dropdown/Dropdown';

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
  { value: 'Senior Full-Stack Engineer', title: 'Senior Full-Stack Engineer', meta: 'Engineering • Remote (India) or Bangalore' },
  { value: 'Machine Learning Engineer (NLP)', title: 'Machine Learning Engineer (NLP)', meta: 'Data • Bangalore' }
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  );
}

export default function Careers() {
  const formRef = useRef(null);
  const positionRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function scrollToApply(position) {
    if (position) setSelectedPosition(position);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Focus the position dropdown after scroll settles
    setTimeout(() => positionRef.current?.focus(), 500);
  }

  const dropdownOptions = [
    ...ROLES.map(r => ({ value: r.value, label: r.title })),
    { value: 'General / Other', label: 'General / Other' }
  ];

  return (
    <>
      <section className={styles.hero}>
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
              <button
                key={i}
                type="button"
                className={styles.roleCard}
                onClick={() => scrollToApply(r.value)}
              >
                <div className={styles.roleInfo}>
                  <h4>{r.title}</h4>
                  <p>{r.meta}</p>
                </div>
                <div className={styles.roleAction}>
                  View Role <Arrow />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apply} ref={formRef}>
        <div className="container container-form">
          <div className={styles.applyHead}>
            <div className={styles.eyebrow}>Apply now</div>
            <h2>Tell us about yourself.</h2>
            <p>We read every application. Don't see a perfect fit? Pick "General / Other" below and drop your resume — we'll reach out if something matches.</p>
          </div>

          {submitted ? (
            <div className={styles.thanks}>
              <div className={styles.thanksCheck}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Application received!</h3>
              <p>Thanks for applying. We'll be in touch within a few days.</p>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  body: formData,
                }).catch(() => {});
                setSubmitted(true);
              }}
            >
              {/* Sign up at web3forms.com and paste your access key here */}
              <input type="hidden" name="access_key" value="47664644-0a17-4f2e-b9c2-51c50b2ed539" />
              <input type="hidden" name="subject" value="Whofy — New Job Application" />
              <input type="hidden" name="from_name" value="Whofy Careers" />
              {/* Web3Forms delivers submissions to the address on the account,
                  which you'll configure as whofyteam@gmail.com. */}

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label htmlFor="apply-name">Full name</label>
                  <input type="text" id="apply-name" name="name" required placeholder="Jane Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="apply-email">Email</label>
                  <input type="email" id="apply-email" name="email" required placeholder="jane@example.com" />
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label htmlFor="apply-phone">Phone (optional)</label>
                  <input type="tel" id="apply-phone" name="phone" placeholder="+91 98765 43210" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="apply-linkedin">LinkedIn</label>
                  <input type="url" id="apply-linkedin" name="linkedin" required placeholder="linkedin.com/in/janedoe" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apply-position">Position</label>
                <Dropdown
                  id="apply-position"
                  name="position"
                  ref={positionRef}
                  required
                  value={selectedPosition}
                  onChange={(val) => setSelectedPosition(val)}
                  options={dropdownOptions}
                  placeholder="Select a position..."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apply-message">Why you'd be a great fit</label>
                <textarea id="apply-message" name="message" required rows={4} placeholder="A few sentences about your background and why you're interested in Whofy." />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="apply-resume">Resume link (Google Drive, Dropbox, etc.)</label>
                <input
                  type="url"
                  id="apply-resume"
                  name="resume_link"
                  required
                  placeholder="https://drive.google.com/file/d/..."
                />
                <div className={styles.fileHint}>Upload your resume to Google Drive or Dropbox and paste the sharing link.</div>
              </div>

              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

              <button type="submit" className={`btn btn-theme btn-lg ${styles.submitBtn}`}>
                Submit application
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

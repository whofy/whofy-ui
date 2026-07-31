import { useState } from 'react';
import styles from './FAQ.module.css';

const FAQS = [
  { q: 'How does the matching actually work?',
    a: "Whofy doesn't just do simple keyword matching. We use a semantic skill graph to understand your resume contextually. For instance, if you have \"ReactJS\", we know you have \"Front-end\" experience. We score every live opening (0-100) against your parsed profile using overlap, seniority, and location fit." },
  { q: 'What file formats are supported?',
    a: 'Currently, we support PDF (.pdf) and Microsoft Word (.docx or .doc) formats up to 5MB in size. We highly recommend PDF for the most accurate parsing layout.' },
  { q: 'Do you store my resume or personal data?',
    a: 'No. Your resume is parsed in-memory securely via our API, matched against our jobs database, and then completely forgotten once your session ends. We do not store your PDF or sell your personal data to third parties.' },
  { q: 'Do I need to create an account?',
    a: "Not to find jobs! Just drag and drop your resume and you'll get your shortlist immediately — no sign-up needed. If you want to save jobs for later, you can create a free account, but it's completely optional." },
  { q: 'Are the job roles actually active?',
    a: "Yes. We specifically focus on the 0-2 years (freshers and early-career) track. Every partner company on Whofy maintains active pipelines for these roles, meaning you aren't applying to ghost postings." }
];

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.pageHeader}>FAQ</h1>
          <p>Everything you need to know about resume parsing, match scoring, and how Whofy helps you land your next role.</p>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.active : ''}`}>
              <button className={styles.question} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className={styles.answer}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

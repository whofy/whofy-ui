import styles from './WhyWhofy.module.css';

const ITEMS = [
  { num: '01', title: 'Fit-first ranking', body: 'Most job boards rank by keyword match. Whofy scores every opening against your actual skills and experience, so the top of your list is worth clicking.' },
  { num: '02', title: 'Made for freshers', body: 'Zero to two years is our whole focus. Every partner company on Whofy has an active early-career track — no filters to fight, no ghost postings.' },
  { num: '03', title: 'See why you matched', body: 'Every result shows the exact skills that lined up with the role. No black-box scores. You understand your shortlist as well as the recruiter does.' },
  { num: '04', title: 'Your resume, your data', body: 'Nothing is stored on our servers, nothing sold to third parties. Your file is parsed, matched, and forgotten in one session.' }
];

export default function WhyWhofy() {
  return (
    <section className={styles.section} id="why">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.eyebrow}>Why Whofy</div>
          <h2>A shortlist you can actually trust.</h2>
          <p>Whofy is built on one idea: your resume already says what you can do. So we let it do the talking, and match you to the roles that fit — not the ones with the most tags.</p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map(it => (
            <div key={it.num} className={styles.item}>
              <div className={styles.num}>{it.num}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

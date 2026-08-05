import styles from './WhyWhofy.module.css';

const ITEMS = [
  { num: '1', title: 'Skills over keywords', body: 'Most job boards match by keyword spam. Whofy understands your actual skills and experience, so every result is relevant, not just tag-stuffed.' },
  { num: '2', title: 'Built for every job seeker', body: 'Fresher or senior, Whofy matches your skills to roles that actually fit. Every listing on Whofy is live and verified, no filters to fight, no ghost postings.' },
  { num: '3', title: 'See why you matched', body: 'Every result shows the exact skills that lined up with the role. No black-box scores. You understand your shortlist as well as the recruiter does.' },
  { num: '4', title: 'Your resume, your data', body: 'Nothing is stored on our servers, nothing sold to third parties. Your file is parsed, matched, and forgotten in one session.' }
];

export default function WhyWhofy() {
  return (
    <section className={styles.section} id="why">
      <div className="container">
        <div className={styles.split}>
          <div className={styles.left}>
            <div className={styles.eyebrow}>Why Whofy</div>
            <h2>A shortlist you can actually trust.</h2>
            <p>Whofy is built on one idea: your resume already says what you can do. So we let it do the talking, and match you to the roles that fit, not the ones with the most tags.</p>
          </div>
          <div className={styles.right}>
            {ITEMS.map(it => (
              <div key={it.num} className={styles.item}>
                <div className={styles.num}>{it.num}</div>
                <div className={styles.content}>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

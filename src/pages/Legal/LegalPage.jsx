import styles from './LegalPage.module.css';

export default function LegalPage({ eyebrow, title, updated, children }) {
  return (
    <div className={styles.page}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div className={styles.head}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h1 className={styles.pageHeader}>{title}</h1>
          {updated && <div className={styles.updated}>Last updated: {updated}</div>}
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
}

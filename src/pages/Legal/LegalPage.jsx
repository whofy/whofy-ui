import SEO from '../../components/SEO/SEO.jsx';
import styles from './LegalPage.module.css';

export default function LegalPage({ eyebrow, title, updated, description, children }) {
  return (
    <div className={styles.page}>
      <SEO title={eyebrow} description={description || title} />
      <div className="container container-narrow">
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

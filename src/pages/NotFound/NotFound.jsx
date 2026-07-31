import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-theme btn-lg">
          Back to home
        </Link>
      </div>
    </section>
  );
}

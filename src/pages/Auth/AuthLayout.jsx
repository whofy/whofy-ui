import { Link } from 'react-router-dom';
import Brand from '../../components/Brand/Brand.jsx';
import styles from './Auth.module.css';

/**
 * Centered single-column shell shared by every auth route: one card holding
 * the brand, heading, form body and footer link. The wrapper centers it and
 * only scrolls if the content genuinely can't fit (extreme zoom / very short
 * viewports), so it never clips.
 */
export default function AuthLayout({ title, subtitle, children, footer, note }) {
  return (
    <div className={styles.wrap}>
      <Link to="/" className={styles.backHome}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        Back to home
      </Link>
      <main className={styles.panel}>
        <div className={styles.cardBrand}>
          <Brand />
        </div>

        <div className={styles.card}>
          <header className={styles.cardHead}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
          {children}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>

        {note && <div className={styles.note}>{note}</div>}

        <p className={styles.legal}>
          By continuing you agree to our{' '}
          <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </main>
    </div>
  );
}

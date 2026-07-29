import Dropzone from '../../../components/Dropzone/Dropzone.jsx';
import styles from './UploadSplit.module.css';

const TRUST = [
  { icon: 'user-off', text: 'No sign-up or account needed' },
  { icon: 'shield-check', text: 'Deleted immediately after matching' },
  { icon: 'clock', text: 'Results in under 60 seconds' }
];

export default function UploadSplit() {
  return (
    <section className={styles.section}>
      <div className="container container-form">
        <div className={styles.split}>
          <div className={styles.left}>
            <div className={styles.eyebrow}>Get started</div>
            <h2 className={styles.heading}>Ready to see your shortlist?</h2>
            <p className={styles.sub}>Your resume does the talking. We find the roles that fit.</p>
            <div className={styles.trust}>
              {TRUST.map(t => (
                <div key={t.icon} className={styles.trustRow}>
                  <div className={styles.trustIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.trustSvg}>
                      {t.icon === 'user-off' && <>
                        <path d="M8.7 3h6.6c.3 0 .5.1.7.3l4.7 4.7c.2.2.3.4.3.7v6.6c0 .3-.1.5-.3.7l-4.7 4.7c-.2.2-.4.3-.7.3H8.7c-.3 0-.5-.1-.7-.3L3.3 16c-.2-.2-.3-.4-.3-.7V8.7c0-.3.1-.5.3-.7L8 3.3c.2-.2.4-.3.7-.3z" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </>}
                      {t.icon === 'shield-check' && <>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </>}
                      {t.icon === 'clock' && <>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </>}
                    </svg>
                  </div>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <Dropzone />
          </div>
        </div>
      </div>
    </section>
  );
}

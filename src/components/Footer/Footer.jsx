import { Link } from 'react-router-dom';
import Brand from '../Brand/Brand.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Brand />
            <p>The resume-first jobs platform for the next generation of engineers, designers, and analysts.</p>
          </div>
          <div className={styles.nav}>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contacts">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className={styles.connect}>
            <h4>Connect</h4>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/company/whofy" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>&copy; 2026 Whofy. All rights reserved.</div>
          <div className={styles.legal}>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

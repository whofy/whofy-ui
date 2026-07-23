import { Link } from 'react-router-dom';
import Brand from '../Brand/Brand.jsx';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Brand />
        <div className={styles.actions}>
          <Link to="/auth/login" className={styles.signIn}>Sign in</Link>
          <Link to="/auth/register" className={styles.signUp}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
}


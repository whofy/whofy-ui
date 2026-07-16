import Brand from '../Brand/Brand.jsx';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Brand />
      </div>
    </nav>
  );
}

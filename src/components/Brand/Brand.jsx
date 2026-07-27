import { Link } from 'react-router-dom';
import styles from './Brand.module.css';

// When your logo file is ready:
//   1. Drop it into public/ as logo.svg (or logo.png)
//   2. Set USE_IMAGE = true
const USE_IMAGE = false;
const LOGO_SRC = '/logo.svg';

export default function Brand({ compact = false }) {
  return (
    <Link to="/" className={styles.brand}>
      {USE_IMAGE ? (
        <img src={LOGO_SRC} alt="Whofy" className={styles.logoImg} />
      ) : (
        <>
          <div className={styles.mark}>W</div>
          {!compact && (
            <div className={styles.name}>
              Who<b>fy</b>
            </div>
          )}
        </>
      )}
    </Link>
  );
}

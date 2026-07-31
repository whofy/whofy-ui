import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Brand from '../Brand/Brand.jsx';
import ProfileSidebar from '../../pages/Profile/ProfileSidebar.jsx';
import styles from './Navbar.module.css';

export default function Navbar({ onProfileToggle }) {
  const { isSignedIn, user } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'
    : '';

  const openProfile = () => {
    setProfileOpen(true);
    onProfileToggle?.(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    onProfileToggle?.(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={`container ${styles.inner}`}>
          <Brand />
          <div className={styles.actions}>
            {isSignedIn ? (
              <button
                className={styles.avatarBtn}
                onClick={openProfile}
                aria-label="Open profile"
              >
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="" className={styles.avatarImg} />
                ) : (
                  initials
                )}
              </button>
            ) : (
              <>
                <Link to="/auth/login" className={styles.signIn}>Sign in</Link>
                <Link to="/auth/register" className={styles.signUp}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {isSignedIn && <ProfileSidebar open={profileOpen} onClose={closeProfile} />}
    </>
  );
}

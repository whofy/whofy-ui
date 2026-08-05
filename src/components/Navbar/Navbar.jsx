import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Brand from '../Brand/Brand.jsx';
import ProfileSidebar from '../../pages/Profile/ProfileSidebar.jsx';
import styles from './Navbar.module.css';

export default function Navbar({ onProfileToggle, onMenuToggle }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); onMenuToggle?.(false); }, [location]);

  const toggleMenu = () => {
    setMenuOpen(v => {
      onMenuToggle?.(!v);
      return !v;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    onMenuToggle?.(false);
  };

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
            {!isLoaded ? (
              <div className={styles.avatarSkeleton} />
            ) : isSignedIn ? (
              <button
                className={styles.avatarBtn}
                onClick={openProfile}
                aria-label="Open profile"
              >
                {initials}
              </button>
            ) : (
              <>
                <Link to="/auth/login" className={styles.signIn}>Sign in</Link>
                <Link to="/auth/register" className={styles.signUp}>Sign up</Link>
              </>
            )}
          </div>

          {isLoaded && !isSignedIn && (
            <button
              className={styles.burger}
              data-open={menuOpen || undefined}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </nav>

      {!isSignedIn && menuOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} />
          <div className={styles.mobileMenu}>
            <div className={styles.menuHeader}>
              <Brand />
              <button className={styles.menuClose} onClick={closeMenu} aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <Link to="/auth/login" className={styles.mobileSignIn} onClick={closeMenu}>Sign in</Link>
            <Link to="/auth/register" className={styles.mobileSignUp} onClick={closeMenu}>Sign up</Link>
          </div>
        </>
      )}

      {isSignedIn && <ProfileSidebar open={profileOpen} onClose={closeProfile} />}
    </>
  );
}

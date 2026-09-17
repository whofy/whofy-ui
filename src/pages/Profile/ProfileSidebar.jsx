import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import { displayName, userInitials, joinedDate } from '../../utils/userDisplay.js';
import { useSavedJobs } from '../../context/SavedJobsContext.jsx';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';
import ResumeUploadButton from '../../components/ResumeUploadButton/ResumeUploadButton.jsx';
import styles from './ProfileSidebar.module.css';

function MyInfoView({ user, onOpenSettings }) {
  return (
    <div className={styles.view}>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Name</span>
        <span className={styles.infoValue}>{displayName(user)}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Email</span>
        <span className={styles.infoValue}>{user.email || 'Not set'}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Joined</span>
        <span className={styles.infoValue}>{joinedDate(user)}</span>
      </div>
      <button className={styles.settingsBtn} onClick={onOpenSettings}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        Account settings
      </button>
    </div>
  );
}

export default function ProfileSidebar({ open, onClose }) {
  const [activeView, setActiveView] = useState(null);
  const { user, signOut } = useAuth();
  const toast = useToast();
  const { savedIds } = useSavedJobs();
  const navigate = useNavigate();

  const sidebarRef = useRef(null);
  useFocusTrap(sidebarRef, open);

  if (!open || !user) return null;

  const initials = userInitials(user);
  const name = displayName(user);

  const handleClose = () => {
    setActiveView(null);
    onClose();
  };

  const handleBack = () => setActiveView(null);

  const handleSavedJobs = () => {
    handleClose();
    navigate('/saved-jobs');
  };

  const handleSignOut = () => {
    handleClose();
    toast.success('Signed out. See you soon!');
    signOut(() => navigate('/'));
  };

  const handleOpenSettings = () => {
    handleClose();
    navigate('/account-settings');
  };

  const headerTitle = activeView === 'info' ? 'My info' : name;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <aside className={styles.sidebar} ref={sidebarRef}>
        <div className={styles.head}>
          <div className={styles.headRow}>
            {activeView && (
              <button className={styles.backBtn} onClick={handleBack} aria-label="Back">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
            )}
            <div className={styles.avatar}>
              {initials}
            </div>
            <div className={styles.name}>{headerTitle}</div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close profile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {!activeView && (
          <div className={styles.menu}>
            <button className={styles.menuItem} onClick={() => setActiveView('info')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <span>My info</span>
            </button>
            <button className={styles.menuItem} onClick={handleSavedJobs}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              <span>Saved jobs</span>
              {savedIds.size > 0 && <span className={styles.badge}>{savedIds.size}</span>}
            </button>
            <ResumeUploadButton className={styles.menuItem} onPicked={handleClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              <span>Upload new resume</span>
            </ResumeUploadButton>
            <button className={`${styles.menuItem} ${styles.signout}`} onClick={handleSignOut}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              <span>Sign out</span>
            </button>
          </div>
        )}

        {activeView === 'info' && <MyInfoView user={user} onOpenSettings={handleOpenSettings} />}
      </aside>
    </>
  );
}

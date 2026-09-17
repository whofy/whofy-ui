import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext.jsx';
import { supabase } from '../../lib/supabase.js';
import { deleteAccount } from '../../api/account.js';
import { displayName, joinedDate } from '../../utils/userDisplay.js';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import { Banner } from '../Auth/AuthUI.jsx';
import styles from './AccountSettings.module.css';

export default function AccountSettings() {
  const { user, loading, getToken, signOut } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameStatus, setNameStatus] = useState({ type: '', msg: '' });
  const [savingName, setSavingName] = useState(false);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwStatus, setPwStatus] = useState({ type: '', msg: '' });
  const [savingPw, setSavingPw] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    // Skip during deletion: signing out sets user=null, and a stateless
    // redirect here would race the deletion flow's own redirect and strip its
    // "account deleted" notice before the sign-in banner can read it.
    if (!loading && !user && !deleting) navigate('/auth/login', { replace: true });
  }, [loading, user, navigate, deleting]);

  useEffect(() => {
    if (user) setName(displayName(user) === 'User' ? '' : displayName(user));
  }, [user]);

  if (loading || !user) return null;

  const handleSaveName = async (e) => {
    e.preventDefault();
    setNameStatus({ type: '', msg: '' });
    setSavingName(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setSavingName(false);
    setNameStatus(error
      ? { type: 'error', msg: error.message }
      : { type: 'success', msg: 'Profile updated.' });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwStatus({ type: '', msg: '' });
    if (password.length < 8) {
      setPwStatus({ type: 'error', msg: 'Password must be at least 8 characters.' });
      return;
    }
    if (password !== confirm) {
      setPwStatus({ type: 'error', msg: 'Passwords do not match.' });
      return;
    }
    setSavingPw(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSavingPw(false);
    if (error) {
      setPwStatus({ type: 'error', msg: error.message });
      return;
    }
    setPassword('');
    setConfirm('');
    setPwStatus({ type: 'success', msg: 'Password changed.' });
  };

  const closeDelete = () => {
    setShowDelete(false);
    setDeleteText('');
    setDeleteError('');
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    setDeleting(true);

    // Step 1: the deletion itself. Only a real failure here should keep the
    // user on this page with an error.
    try {
      const token = await getToken();
      await deleteAccount(token);
    } catch (err) {
      setDeleting(false);
      setDeleteError(err.message || 'Something went wrong. Please try again.');
      return;
    }

    // Step 2: the account is gone. Clearing the (now-orphaned) session can
    // itself error since the user no longer exists — never let that swallow
    // the redirect + confirmation toast.
    toast.success('Your account and all its data have been permanently deleted.');
    try {
      await signOut();
    } catch { /* session is already invalid — ignore */ }

    navigate('/auth/login', { replace: true });
  };

  return (
    <div className={styles.page}>
      <Helmet><title>Account settings · Whofy</title></Helmet>
      <div className={styles.inner}>
        <header className={styles.head}>
          <h1>Account settings</h1>
          <p>Manage your profile and sign-in details.</p>
        </header>

        {/* Profile */}
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2>Profile</h2>
            <span className={styles.joined}>Joined {joinedDate(user)}</span>
          </div>
          <form className={styles.form} onSubmit={handleSaveName}>
            <div className={styles.group}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={user.email || ''} disabled />
              <span className={styles.hint}>Email can't be changed here.</span>
            </div>
            {nameStatus.msg && <Banner type={nameStatus.type}>{nameStatus.msg}</Banner>}
            <div className={styles.actions}>
              <button type="submit" className={styles.primary} disabled={savingName}>
                {savingName ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </section>

        {/* Password */}
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2>Password</h2>
          </div>
          <form className={styles.form} onSubmit={handleChangePassword}>
            <div className={styles.group}>
              <label htmlFor="newPw">New password</label>
              <input
                id="newPw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="confirmPw">Confirm new password</label>
              <input
                id="confirmPw"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            {pwStatus.msg && <Banner type={pwStatus.type}>{pwStatus.msg}</Banner>}
            <div className={styles.actions}>
              <button type="submit" className={styles.primary} disabled={savingPw}>
                {savingPw ? 'Updating…' : 'Change password'}
              </button>
            </div>
          </form>
        </section>

        {/* Danger zone */}
        <section className={`${styles.card} ${styles.danger}`}>
          <div className={styles.cardHead}>
            <h2>Delete account</h2>
          </div>
          <p className={styles.dangerText}>
            Permanently delete your account, your saved jobs, and all associated
            data. This action cannot be undone.
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.destructive} onClick={() => setShowDelete(true)}>
              Delete account
            </button>
          </div>
        </section>

        <button className={styles.back} onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back to app
        </button>
      </div>

      {showDelete && (
        <div className={styles.modalOverlay} onClick={closeDelete}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={styles.modalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
            </div>
            <h3 className={styles.modalTitle}>Delete your account?</h3>
            <p className={styles.modalBody}>
              This permanently removes your account and every saved job. It can't
              be undone. Type <strong>DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              className={styles.modalInput}
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="DELETE"
              autoFocus
            />
            {deleteError && <Banner type="error">{deleteError}</Banner>}
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancel} onClick={closeDelete} disabled={deleting}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.destructive}
                onClick={handleDeleteAccount}
                disabled={deleteText !== 'DELETE' || deleting}
              >
                {deleting ? 'Deleting…' : 'Delete account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

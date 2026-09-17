import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase.js';
import AuthLayout from './AuthLayout.jsx';
import { Field, PasswordInput, Banner, SubmitButton } from './AuthUI.jsx';
import styles from './Auth.module.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    // The recovery link established a temporary session (detectSessionInUrl),
    // so updateUser applies to the user who requested the reset.
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message.includes('session')
        ? 'This reset link is invalid or has expired. Request a new one.'
        : error.message);
      return;
    }
    setDone(true);
    setTimeout(() => navigate('/', { replace: true }), 1600);
  };

  if (done) {
    return (
      <AuthLayout title="Password updated" subtitle="You're all set, redirecting you now.">
        <Helmet><title>Password updated · Whofy</title></Helmet>
        <div className={styles.status}>
          <div className={styles.statusIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you don't use elsewhere."
      footer={<>Back to <Link to="/auth/login">Sign in</Link></>}
    >
      <Helmet><title>Reset password · Whofy</title></Helmet>

      <Banner>{error}</Banner>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field label="New password" hint="At least 8 characters.">
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </Field>
        <Field label="Confirm password">
          <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" placeholder="Re-enter password" />
        </Field>
        <SubmitButton loading={loading}>Update password</SubmitButton>
      </form>
    </AuthLayout>
  );
}

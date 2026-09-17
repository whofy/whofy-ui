import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase.js';
import AuthLayout from './AuthLayout.jsx';
import { Field, Banner, SubmitButton } from './AuthUI.jsx';
import styles from './Auth.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle={`If an account exists for ${email}, we've sent a password reset link.`}
        footer={<>Back to <Link to="/auth/login">Sign in</Link></>}
      >
        <Helmet><title>Reset link sent · Whofy</title></Helmet>
        <div className={styles.status}>
          <div className={styles.statusIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<>Remembered it? <Link to="/auth/login">Sign in</Link></>}
    >
      <Helmet><title>Forgot password · Whofy</title></Helmet>

      <Banner>{error}</Banner>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field label="Email">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={styles.input}
          />
        </Field>
        <SubmitButton loading={loading}>Send reset link</SubmitButton>
      </form>
    </AuthLayout>
  );
}

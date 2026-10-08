import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase.js';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import AuthLayout from './AuthLayout.jsx';
import { GoogleButton, Divider, Field, PasswordInput, Banner, SubmitButton } from './AuthUI.jsx';
import styles from './Auth.module.css';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleOAuth = async (provider) => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // When email confirmation is required, no session is returned — show the
    // "check your inbox" state. Otherwise the user is signed in immediately.
    if (data.session) {
      toast.success('Account created. Welcome to Whofy!');
      navigate('/', { replace: true });
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle={`We sent a confirmation link to ${email}. Click it to activate your account.`}
        footer={<>Back to <Link to="/auth/login">Sign in</Link></>}
      >
        <Helmet><title>Confirm your email · Whofy</title></Helmet>
        <div className={styles.status}>
          <div className={styles.statusIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </div>
          <p className={styles.subtitle}>
            Didn't get it? Check your spam folder, or wait a moment and try again.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start matching with roles built for you."
      footer={<>Already have an account? <Link to="/auth/login">Sign in</Link></>}
      note={<>Just browsing? You don't need an account to search jobs. <Link to="/">Keep browsing</Link></>}
    >
      <Helmet><title>Sign up · Whofy</title></Helmet>

      <Banner>{error}</Banner>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field label="Full name">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            autoComplete="name"
            required
            className={styles.input}
          />
        </Field>

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

        <Field label="Password">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </Field>

        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>

      <Divider />
      <GoogleButton onClick={() => handleOAuth('google')} disabled={loading} label="Sign up with Google" />
    </AuthLayout>
  );
}

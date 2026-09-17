import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase.js';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import AuthLayout from './AuthLayout.jsx';
import { GoogleButton, Divider, Field, PasswordInput, Banner, SubmitButton } from './AuthUI.jsx';
import styles from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const next = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Email or password is incorrect.'
        : error.message);
      return;
    }
    toast.success('Signed in. Welcome back!');
    navigate(next, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={<>New to Whofy? <Link to="/auth/register">Create an account</Link></>}
      note={<>Just browsing? You don't need an account to search jobs. <Link to="/">Keep browsing</Link></>}
    >
      <Helmet><title>Sign in · Whofy</title></Helmet>

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

        <Field label="Password">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>

        <div className={styles.rowBetween}>
          <span />
          <Link to="/auth/forgot" className={styles.link}>Forgot password?</Link>
        </div>

        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>

      <Divider />
      <GoogleButton onClick={() => handleOAuth('google')} disabled={loading} />
    </AuthLayout>
  );
}

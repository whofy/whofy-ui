import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase.js';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import AuthLayout from './AuthLayout.jsx';
import styles from './Auth.module.css';

/**
 * Landing route for OAuth (Google) and email-confirmation redirects. The
 * supabase client is configured with detectSessionInUrl, so it exchanges the
 * code/token in the URL for a session on load. We wait for that to settle,
 * then send the user home — or show an error if the link was bad/expired.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState('');

  useEffect(() => {
    // Provider-side denial or a malformed link comes back as an error param.
    const params = new URLSearchParams(window.location.search || window.location.hash.replace('#', '?'));
    if (params.get('error')) {
      setError(params.get('error_description') || 'Sign-in was cancelled or failed.');
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      toast.success('Signed in. Welcome!');
      navigate('/', { replace: true });
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) finish();
    });

    // Fallback: if nothing arrives, the link was invalid/expired.
    const timer = setTimeout(() => {
      if (!settled) setError('This sign-in link is invalid or has expired.');
    }, 8000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate, toast]);

  if (error) {
    return (
      <AuthLayout
        title="Something went wrong"
        subtitle={error}
        footer={<>Back to <Link to="/auth/login">Sign in</Link></>}
      >
        <Helmet><title>Sign-in error · Whofy</title></Helmet>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Signing you in" subtitle="Hang tight, this only takes a moment.">
      <Helmet><title>Signing in · Whofy</title></Helmet>
      <div className={styles.status}>
        <div className={styles.bigSpinner} />
      </div>
    </AuthLayout>
  );
}

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * Supabase-backed auth context.
 *
 * Exposes a shape deliberately close to the Clerk hooks it replaces
 * (`isLoaded`, `isSignedIn`, `user`, `getToken`, `signOut`) so the rest of
 * the app rewires with minimal churn. `user` is the raw Supabase user —
 * read display fields through utils/userDisplay.js.
 */
const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isLoaded: false,
  isSignedIn: false,
  getToken: async () => null,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initial read from local storage (no network) so we render the right
    // state on first paint; onAuthStateChange keeps it live afterwards.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Always pull from getSession() so a silently-refreshed token is used
  // rather than a stale one captured in state.
  const getToken = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }, []);

  const signOut = useCallback(async (afterSignOut) => {
    // scope: 'local' clears the session on THIS device without waiting on a
    // network round-trip to revoke it server-side, so sign-out feels instant.
    // The refresh token expires on its own. This also avoids a failed network
    // call when the account was just deleted.
    await supabase.auth.signOut({ scope: 'local' });
    if (typeof afterSignOut === 'function') afterSignOut();
  }, []);

  const value = {
    user: session?.user || null,
    session,
    loading,
    isLoaded: !loading,
    isSignedIn: !!session,
    getToken,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

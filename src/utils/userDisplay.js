// Supabase stores profile fields in user.user_metadata (full_name / name /
// avatar_url), unlike Clerk's first-class user.firstName etc. These helpers
// normalize that so components don't each reach into metadata differently.

export function displayName(user) {
  if (!user) return 'User';
  const meta = user.user_metadata || {};
  return (
    meta.full_name ||
    meta.name ||
    [meta.first_name, meta.last_name].filter(Boolean).join(' ') ||
    user.email?.split('@')[0] ||
    'User'
  );
}

export function userInitials(user) {
  const name = displayName(user);
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    // Two+ words → first letter of first + first letter of last ("Rohan Akode" → "RA")
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  // Single word → just its first letter ("rohan" → "R")
  return (parts[0]?.[0] || 'U').toUpperCase();
}

export function avatarUrl(user) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
}

export function joinedDate(user) {
  if (!user?.created_at) return '';
  return new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

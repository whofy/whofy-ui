/**
 * Reads/writes the extracted preferences from an uploaded resume, as
 * returned by POST /api/upload-resume (see Processing.jsx).
 *
 * Shape:
 *   {
 *     location:        string,   // maps to Location filter
 *     skills:          string[], // not filtered on yet, kept for the future matcher
 *     experienceLevel: string    // not filtered on yet, kept for the future matcher
 *   }
 */
const KEY = 'whofy_resume_prefs';

export function saveResumePrefs(prefs) {
  try { sessionStorage.setItem(KEY, JSON.stringify(prefs)); } catch {}
}

export function readResumePrefs() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearResumePrefs() {
  try { sessionStorage.removeItem(KEY); } catch {}
}

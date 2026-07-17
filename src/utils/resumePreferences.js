/**
 * Reads/writes the extracted preferences from an uploaded resume.
 * Currently mocked in sessionStorage — the backend will populate this
 * for real once wired up.
 *
 * Shape:
 *   {
 *     skills:     string[],   // maps to Skills filter
 *     location:   string,     // maps to Location filter
 *     experience: string,     // maps to Experience filter
 *     type:       string      // maps to Job type filter
 *   }
 */
const KEY = 'whofy_resume_prefs';

// Mock — as if the resume was parsed and these were extracted
export const MOCK_EXTRACTED = {
  skills: ['React', 'JavaScript', 'CSS'],
  location: 'Bengaluru',
  experience: 'Fresher',
  type: 'Full-time'
};

export function saveResumePrefs(prefs) {
  try { sessionStorage.setItem(KEY, JSON.stringify(prefs)); } catch (_) {}
}

export function readResumePrefs() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function clearResumePrefs() {
  try { sessionStorage.removeItem(KEY); } catch (_) {}
}

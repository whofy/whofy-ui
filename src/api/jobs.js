/**
 * Jobs API. Talks to the real whofy-api backend.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getMatches(skills = [], filters = {}, { skip = 0, limit = 50 } = {}) {
  const params = new URLSearchParams();
  if (skills.length) params.set('skills', skills.join(','));
  if (filters.source) params.set('source', filters.source);
  if (filters.company) params.set('company', filters.company);
  if (filters.location) params.set('location', filters.location);
  if (filters.type) params.set('type', filters.type);
  if (filters.experience) params.set('experience', filters.experience);
  if (filters.posted) params.set('posted', filters.posted);
  params.set('skip', String(skip));
  params.set('limit', String(limit));
  const qs = params.toString();
  const res = await fetch(`${API_URL}/api/matches${qs ? '?' + qs : ''}`);
  if (!res.ok) throw new Error('Failed to load matches');
  return res.json();
}

export async function getLocations() {
  const res = await fetch(`${API_URL}/api/locations`);
  if (!res.ok) throw new Error('Failed to load locations');
  return res.json();
}

export async function getCompanies() {
  const res = await fetch(`${API_URL}/api/companies`);
  if (!res.ok) throw new Error('Failed to load companies');
  return res.json();
}

export async function getSources() {
  const res = await fetch(`${API_URL}/api/sources`);
  if (!res.ok) throw new Error('Failed to load sources');
  return res.json();
}

export async function searchJobs(query) {
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to load job');
  return res.json();
}

export async function getSavedJobs(token) {
  const res = await fetch(`${API_URL}/api/saved-jobs`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load saved jobs');
  return res.json();
}

export async function getSavedJobIds(token) {
  const res = await fetch(`${API_URL}/api/saved-jobs/ids`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load saved job ids');
  return res.json();
}

export async function saveJob(token, jobId) {
  const res = await fetch(`${API_URL}/api/saved-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ job_id: jobId }),
  });
  if (!res.ok) throw new Error('Failed to save job');
  return res.json();
}

export async function unsaveJob(token, jobId) {
  const res = await fetch(`${API_URL}/api/saved-jobs/${encodeURIComponent(jobId)}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to unsave job');
  return res.json();
}

export async function uploadResume(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/api/upload-resume`, { method: 'POST', body: form });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || 'Upload failed');
  }
  return res.json();
}

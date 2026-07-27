/**
 * Jobs API. Talks to the real whofy-api backend.
 */
import { DUMMY_JOBS } from '../mocks/jobs.js';

const USE_MOCK = false;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

export async function getMatches(skills = [], filters = {}, { skip = 0, limit = 50 } = {}) {
  if (USE_MOCK) {
    await delay(200);
    const all = DUMMY_JOBS.slice();
    return { jobs: all.slice(skip, skip + limit), total: all.length, skip, limit };
  }
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
  if (USE_MOCK) return [...new Set(DUMMY_JOBS.map(j => j.location))].sort();
  const res = await fetch(`${API_URL}/api/locations`);
  if (!res.ok) throw new Error('Failed to load locations');
  return res.json();
}

export async function getCompanies() {
  if (USE_MOCK) return [...new Set(DUMMY_JOBS.map(j => j.company))].sort();
  const res = await fetch(`${API_URL}/api/companies`);
  if (!res.ok) throw new Error('Failed to load companies');
  return res.json();
}

export async function getSources() {
  if (USE_MOCK) return [...new Set(DUMMY_JOBS.map(j => j.source))].sort();
  const res = await fetch(`${API_URL}/api/sources`);
  if (!res.ok) throw new Error('Failed to load sources');
  return res.json();
}

export async function searchJobs(query) {
  if (USE_MOCK) return DUMMY_JOBS.filter(j => j.title.toLowerCase().includes(query.toLowerCase()));
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getJob(id) {
  if (USE_MOCK) {
    await delay(80);
    return DUMMY_JOBS.find(j => String(j.id) === String(id));
  }
  const res = await fetch(`${API_URL}/api/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to load job');
  return res.json();
}

export async function uploadResume(file) {
  if (USE_MOCK) {
    await delay(1500);
    return {
      resume: {
        skills: ['React', 'JavaScript', 'CSS'],
        location: 'Bengaluru',
        experienceLevel: 'Fresher',
        education: [],
        summary: ''
      }
    };
  }
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/api/upload-resume`, { method: 'POST', body: form });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || 'Upload failed');
  }
  return res.json();
}

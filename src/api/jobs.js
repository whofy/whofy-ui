/**
 * Jobs API.
 *
 * Currently returns mock data. When the backend is ready, swap the body
 * of each function to call fetch(`${VITE_API_URL}/api/...`) — the shape
 * of the returned data must stay the same so consumers don't change.
 */
import { DUMMY_JOBS } from '../mocks/jobs.js';

const USE_MOCK = true;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

export async function getMatches() {
  if (USE_MOCK) {
    await delay(200);
    return DUMMY_JOBS.slice();
  }
  const res = await fetch(`${API_URL}/api/matches`);
  if (!res.ok) throw new Error('Failed to load matches');
  return res.json();
}

export async function getJob(id) {
  if (USE_MOCK) {
    await delay(80);
    return DUMMY_JOBS.find(j => j.id === Number(id));
  }
  const res = await fetch(`${API_URL}/api/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to load job');
  return res.json();
}

export async function uploadResume(file) {
  if (USE_MOCK) {
    await delay(1500);
    return { jobs: DUMMY_JOBS.slice() };
  }
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/api/upload-resume`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

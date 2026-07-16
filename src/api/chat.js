const USE_MOCK = true;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

const MOCK_REPLIES = [
  "Great question! Once we're live, I'll pull real jobs matching your ask.",
  "You can upload your resume above and I'll shortlist roles that fit you.",
  "Try asking things like 'remote Python jobs' or 'internships in Bengaluru'.",
  "I can help you understand roles, compare companies, or refine your search."
];

export async function sendChatMessage(text, history = []) {
  if (USE_MOCK) {
    await delay(600);
    const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
    return { reply };
  }
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, history })
  });
  if (!res.ok) throw new Error('Chat failed');
  return res.json();
}

const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_URL = RAW_API_URL.trim().replace(/%20/g, '').replace(/\/+$/, '');

export async function sendChatMessage(text, history = []) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, history })
  });
  if (!res.ok) throw new Error('Chat failed');
  return res.json();
}

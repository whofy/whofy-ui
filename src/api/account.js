const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function deleteAccount(token) {
  const res = await fetch(`${API_URL}/api/account`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || 'Failed to delete account');
  }
  return res.json();
}

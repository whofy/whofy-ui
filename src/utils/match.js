// Match scoring (matchLevel/matchLabel) is deferred until real resume
// matching (matcher.py in whofy-api) exists — no fabricated scores for now.

const DAY_MS = 24 * 60 * 60 * 1000;

export function postedLabel(postedAt) {
  if (!postedAt) return 'Recently';
  const posted = new Date(postedAt);
  if (Number.isNaN(posted.getTime())) return 'Recently';

  const days = Math.floor((Date.now() - posted.getTime()) / DAY_MS);
  if (days <= 0) return 'Past 24 hours';
  if (days === 1) return '1d ago';
  if (days < 14) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

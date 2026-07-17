export function matchLevel(score) {
  if (score >= 85) return 'strong';
  if (score >= 70) return 'good';
  return 'weak';
}

export function matchLabel(level) {
  return level === 'strong' ? 'Strong match'
       : level === 'good'   ? 'Good match'
       : 'Stretch role';
}

const POSTED_LABELS = ['Today', '2d ago', '4d ago', '1w ago', '2w ago', '5d ago'];
export function postedLabel(id) {
  return POSTED_LABELS[id % POSTED_LABELS.length];
}

const LOGO_COLORS = ['#1e40af', '#047857', '#b45309', '#7c3aed', '#c74300', '#0891b2', '#be123c'];

export function logoColor(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return LOGO_COLORS[sum % LOGO_COLORS.length];
}

export function initial(name) {
  return (name || '?').charAt(0).toUpperCase();
}

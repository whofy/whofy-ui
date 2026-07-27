export function sortJobs(jobs, mode) {
  const copy = jobs.slice();
  switch (mode) {
    case 'relevance':
      // No-op — the backend already returned these ranked by skill match
      // (see GET /api/matches?skills=...), so preserve that order as-is.
      return copy;
    case 'companyAZ':
      return copy.sort((a, b) => a.company.localeCompare(b.company));
    case 'newest':
    default:
      return copy.sort((a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0));
  }
}

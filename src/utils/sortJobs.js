function salaryMin(s) {
  const nums = (s.match(/[\d.]+/g) || []).map(Number);
  if (!nums.length) return 0;
  if (/\/mo/i.test(s)) return (nums[0] * 12) / 100000;
  return nums[0];
}

export function sortJobs(jobs, mode) {
  const copy = jobs.slice();
  switch (mode) {
    case 'newest':
      // Fake "posted" ordering — mock data lacks real dates, so use inverse id
      return copy.sort((a, b) => b.id - a.id);
    case 'salaryHigh':
      return copy.sort((a, b) => salaryMin(b.salary) - salaryMin(a.salary));
    case 'salaryLow':
      return copy.sort((a, b) => salaryMin(a.salary) - salaryMin(b.salary));
    case 'companyAZ':
      return copy.sort((a, b) => a.company.localeCompare(b.company));
    case 'best':
    default:
      return copy.sort((a, b) => b.score - a.score);
  }
}

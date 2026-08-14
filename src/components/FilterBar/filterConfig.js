export const STATIC_FILTERS = [
  { key: 'posted', label: 'Posted', options: [
    { value: 'today', label: 'Past 24 hours' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' }
  ]}
];

export const TYPE_OPTIONS = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'On-site', label: 'On-site' },
];

// Year ranges match the classifier in whofy-api/listings/shared/enrich.py
// (_YEARS_RE branches). If those buckets change, update these labels too.
export const EXPERIENCE_OPTIONS = [
  { value: 'Internship',  label: 'Internship (0 yrs)' },
  { value: 'Entry Level', label: 'Entry Level (< 1 yr)' },
  { value: 'Junior',      label: 'Junior (1–3 yrs)' },
  { value: 'Mid Level',   label: 'Mid Level (3–6 yrs)' },
  { value: 'Senior',      label: 'Senior (6+ yrs)' },
];

export const DYNAMIC_FILTERS = ['location'];

export const SKILL_OPTIONS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'C#', 'Ruby', 'PHP', 'Rust',
  'React', 'Vue', 'Angular', 'Node.js', 'Next.js', 'Svelte', 'Django', 'FastAPI', 'Spring',
  'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Linux',
  'Git', 'CI/CD', 'GraphQL', 'REST API', 'Microservices',
  'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'LLM',
  'HTML', 'CSS', 'Swift', 'Kotlin', 'Android', 'iOS', 'Figma'
];

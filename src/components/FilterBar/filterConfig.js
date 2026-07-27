export const STATIC_FILTERS = [
  { key: 'posted', label: 'Posted', options: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' }
  ]}
];

export const TYPE_OPTIONS = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'On-site', label: 'On-site' },
];

export const EXPERIENCE_OPTIONS = [
  { value: 'Internship', label: 'Internship' },
  { value: 'Entry Level', label: 'Entry Level' },
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid Level', label: 'Mid Level' },
  { value: 'Senior', label: 'Senior' },
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

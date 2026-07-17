export const STATIC_FILTERS = [
  { key: 'type', label: 'Job type', options: [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Part-time', label: 'Part-time' }
  ]},
  { key: 'salary', label: 'Salary range', options: [
    { value: '0-5', label: 'Under ₹5 LPA' },
    { value: '5-8', label: '₹5–8 LPA' },
    { value: '8-12', label: '₹8–12 LPA' },
    { value: '12+', label: '₹12 LPA+' }
  ]},
  { key: 'experience', label: 'Experience', options: [
    { value: 'Fresher', label: 'Fresher' },
    { value: '0-1', label: '0–1 year' },
    { value: '0-2', label: '0–2 years' },
    { value: '1-2', label: '1–2 years' }
  ]},
  { key: 'work', label: 'Work style', options: [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ]},
  { key: 'industry', label: 'Industry', options: [
    { value: 'Technology', label: 'Technology' },
    { value: 'Fintech', label: 'Fintech' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'SaaS', label: 'SaaS' }
  ]},
  { key: 'posted', label: 'Posted', options: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' }
  ]}
];

// Filters where the options come from the actual jobs data
export const DYNAMIC_FILTERS = ['location', 'skills'];

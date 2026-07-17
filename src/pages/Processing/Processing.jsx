import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveResumePrefs, MOCK_EXTRACTED } from '../../utils/resumePreferences.js';
import styles from './Processing.module.css';

const EXTRACTED_SKILLS = ['JavaScript', 'React', 'Python', 'SQL', 'Git', 'HTML/CSS'];
const SCAN_TARGET = 12400;
const TOTAL_MS = 2600;
const STEP_DELAY = 900;

const STEP_LABELS = [
  'Parsing resume text and structure',
  'Extracting skills, education, and experience',
  'Matching against 12,400 live roles'
];

function formatSize(bytes) {
  if (!bytes) return 'Resume file';
  if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state || {};

  const [pct, setPct] = useState(0);
  const [scanned, setScanned] = useState(0);
  const [skills, setSkills] = useState([]);
  const [stepStates, setStepStates] = useState(['', '', '']);
  const rafRef = useRef(null);

  useEffect(() => {
    const startedAt = performance.now();

    function tick(now) {
      const p = Math.min(1, (now - startedAt) / TOTAL_MS);
      setPct(Math.round(p * 100));
      setScanned(Math.round(p * SCAN_TARGET));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    const skillTimeouts = EXTRACTED_SKILLS.map((sk, idx) =>
      setTimeout(() => setSkills(prev => [...prev, sk]), 400 + idx * 260)
    );

    let i = 0;
    let timeoutId = null;
    function advance() {
      setStepStates(prev => {
        const next = [...prev];
        if (i > 0) next[i - 1] = 'done';
        if (i < next.length) next[i] = 'active';
        return next;
      });
      if (i < STEP_LABELS.length) {
        i++;
        timeoutId = setTimeout(advance, STEP_DELAY);
      } else {
        // Persist the "extracted" preferences so Results can auto-select filters.
        // Backend will replace MOCK_EXTRACTED with a real parse later.
        saveResumePrefs(MOCK_EXTRACTED);
        timeoutId = setTimeout(() => navigate('/results'), 300);
      }
    }
    advance();

    return () => {
      cancelAnimationFrame(rafRef.current);
      skillTimeouts.forEach(clearTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={`${styles.card} fade-in`}>
        <div className={styles.header}>
          <div className={styles.brandMark}>W</div>
          <div className={styles.brandName}>Who<b>fy</b></div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>Analyzing your resume</h2>
          <p className={styles.subtitle}>Hang tight — we're building your personalized shortlist.</p>

          <div className={styles.fileRow}>
            <div className={styles.fileIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <div className={styles.fileMeta}>
              <div className={styles.fileName}>{info.filename || 'resume.pdf'}</div>
              <div className={styles.fileSize}>{formatSize(info.size)}</div>
            </div>
            <div className={styles.fileBadge}>Scanning</div>
          </div>

          <div className={styles.progress}>
            <div className={styles.progressHeader}>
              <span><b>{pct}</b>% complete</span>
              <span><b>{scanned.toLocaleString('en-IN')}</b> live roles scanned</span>
            </div>
            <div className={styles.progressBar}>
              <span style={{ width: `${pct}%` }}></span>
            </div>
          </div>

          <div className={styles.skillsBlock}>
            <div className={styles.skillsLabel}>Skills detected</div>
            <div className={styles.skills}>
              {skills.map(sk => <span key={sk} className={styles.chip}>{sk}</span>)}
            </div>
          </div>

          <div className={styles.steps}>
            {STEP_LABELS.map((label, i) => (
              <div key={i} className={`${styles.step} ${stepStates[i] ? styles[stepStates[i]] : ''}`}>
                <div className={styles.tick}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

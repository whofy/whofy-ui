import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadResume, getMatches } from '../../api/jobs.js';
import { saveResumePrefs } from '../../utils/resumePreferences.js';
import styles from './Processing.module.css';

const TOTAL_MS = 10000;
const STEP_DELAY = 3200;
const CAP = 0.95;
const CREEP_CEILING = 0.97;
const CREEP_DECAY_MS = 4000;
const FINISH_MS = 200;

const STEP_LABELS = [
  'Parsing resume text and structure',
  'Extracting skills, education, and experience',
  'Matching against live roles'
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
  const [scanning, setScanning] = useState(true);
  const [stepStates, setStepStates] = useState(['', '', '']);
  const [finished, setFinished] = useState(false);
  const [upload, setUpload] = useState({ status: 'pending', resume: null, error: null });
  const [parsedSkills, setParsedSkills] = useState([]);
  const rafRef = useRef(null);
  const navigated = useRef(false);
  const uploadStatusRef = useRef('pending');
  const prefetchedJobs = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => { uploadStatusRef.current = upload.status; }, [upload.status]);

  useEffect(() => {
    if (!info.file) navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!info.file) return;
    const startedAt = performance.now();

    function tick(now) {
      if (uploadStatusRef.current !== 'pending') return;
      const elapsed = now - startedAt;
      const p = elapsed < TOTAL_MS
        ? (elapsed / TOTAL_MS) * CAP
        : CREEP_CEILING - (CREEP_CEILING - CAP) * Math.exp(-(elapsed - TOTAL_MS) / CREEP_DECAY_MS);
      setPct(Math.round(p * 100));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    let i = 0;
    let timeoutId = null;
    function advance() {
      setStepStates(prev => {
        const next = [...prev];
        if (i > 0) next[i - 1] = 'done';
        if (i < next.length) next[i] = 'active';
        return next;
      });
      if (i < STEP_LABELS.length - 1) {
        i++;
        timeoutId = setTimeout(advance, STEP_DELAY);
      }
    }
    advance();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.file]);

  useEffect(() => {
    if (!info.file) return;
    uploadResume(info.file)
      .then(async ({ resume }) => {
        const skills = resume.skills || [];
        setParsedSkills(skills);
        const data = await getMatches(skills).catch(() => null);
        prefetchedJobs.current = data ? data.jobs : null;
        setUpload({ status: 'done', resume, error: null });
      })
      .catch(err => setUpload({ status: 'error', resume: null, error: err.message }));
  }, [info.file]);

  useEffect(() => {
    if (upload.status !== 'done') return;
    const timeoutId = setTimeout(() => {
      setPct(100);
      setScanning(false);
      setStepStates(prev => { const next = [...prev]; next[next.length - 1] = 'done'; return next; });
      setFinished(true);
    }, FINISH_MS);
    return () => clearTimeout(timeoutId);
  }, [upload.status]);

  useEffect(() => {
    if (navigated.current || upload.status === 'error' || !finished) return;
    navigated.current = true;
    saveResumePrefs({
      location: upload.resume.location || '',
      skills: upload.resume.skills || [],
      experienceLevel: upload.resume.experienceLevel || ''
    });
    setTimeout(() => navigate('/results'), 500);
  }, [finished, upload, navigate]);

  function handleFileSelect(e) {
    const files = e.target.files;
    if (!files || !files.length) return;
    const file = files[0];
    const okType = /\.(pdf|docx?)$/i.test(file.name);
    if (!okType) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }
    
    setPct(0);
    setScanning(true);
    setStepStates(['', '', '']);
    setFinished(false);
    setUpload({ status: 'pending', resume: null, error: null });
    navigated.current = false;
    
    navigate('/processing', { state: { file, filename: file.name, size: file.size }, replace: true });
  }

  if (upload.status === 'error') {
    return (
      <div className={styles.page}>
        <div className={`${styles.card} fade-in`}>
          <div className={styles.header}>
            <div className={styles.brandMark}>W</div>
            <div className={styles.brandName}>Who<b>fy</b></div>
          </div>
          <div className={styles.body} style={{ padding: '2.5rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className={styles.title} style={{ margin: 0, textAlign: 'left' }}>Couldn't read your resume</h2>
                <p className={styles.subtitle} style={{ margin: '0.5rem 0 0 0', textAlign: 'left' }}>Please upload a PDF or DOCX file under 5 MB.</p>
              </div>
              <button 
                className="btn btn-theme btn-lg" 
                style={{ padding: '0.75rem 1.5rem', flexShrink: 0, marginLeft: '1.5rem' }}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload again
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              accept=".pdf,.docx,.doc" 
              onChange={handleFileSelect} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} fade-in`}>
        <div className={styles.header}>
          <div className={styles.brandMark}>W</div>
          <div className={styles.brandName}>Who<b>fy</b></div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>Analyzing your resume</h2>
          <p className={styles.subtitle}>Hang tight, we're building your personalized shortlist.</p>

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
              {scanning && <span className={styles.scanPulse}>Scanning live jobs...</span>}
            </div>
            <div className={styles.progressBar}>
              <span style={{ width: `${pct}%` }}></span>
            </div>
          </div>

          {parsedSkills.length > 0 && (
            <div className={styles.skillsBlock}>
              <div className={styles.skillsLabel}>Skills detected</div>
              <div className={styles.skills}>
                {parsedSkills.map(sk => <span key={sk} className={styles.chip}>{sk}</span>)}
              </div>
            </div>
          )}

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

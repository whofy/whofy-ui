import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

const STATS = [
  { target: 100000, suffix: '+', cap: 'Live openings' },
  { target: 500, suffix: '+', cap: 'Hiring companies' },
  { text: '<1min', cap: 'Avg. match time' },
  { target: 0, suffix: '', cap: 'Resumes stored' }
];

const DURATION = 1800;

function AnimatedNum({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === 0) return;
    const start = performance.now();
    let raf;
    function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <div ref={ref} className={styles.num}>
      {started ? count.toLocaleString('en-IN') : '0'}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <div className={styles.band}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat}>
              {s.text ? (
                <div className={styles.num}>{s.text}</div>
              ) : (
                <AnimatedNum target={s.target} suffix={s.suffix} />
              )}
              <div className={styles.cap}>{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

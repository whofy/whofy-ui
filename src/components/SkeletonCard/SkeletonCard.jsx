import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.top}>
        <div className={styles.logo}></div>
        <div className={styles.info}>
          <div className={`${styles.bar} ${styles.title}`}></div>
          <div className={`${styles.bar} ${styles.co}`}></div>
          <div className={`${styles.bar} ${styles.meta}`}></div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.bar} ${styles.match}`}></div>
        <div className={`${styles.bar} ${styles.time}`}></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}

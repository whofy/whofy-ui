import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dropzone.module.css';

export default function Dropzone() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  function handleFiles(files) {
    if (!files || !files.length) return;
    const file = files[0];
    const okType = /\.(pdf|docx?)$/i.test(file.name);
    if (!okType) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5 MB.');
      return;
    }
    navigate('/processing', { state: { file, filename: file.name, size: file.size } });
  }

  return (
    <div
      id="dropzone"
      className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      aria-label="Upload your resume"
    >
      <div className={styles.icon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m8 17 4-4 4 4" />
        </svg>
      </div>
      <div className={styles.title}>Upload your resume</div>
      <div className={styles.sub}>Drag and drop or <b>browse files</b></div>
      <div className={styles.formats}>PDF or DOCX &middot; Max 5&nbsp;MB &middot; Processed securely</div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

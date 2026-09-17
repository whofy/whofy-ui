import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A "re-upload your resume" trigger usable anywhere. Renders a button (styled
 * by the caller via `className`) plus a hidden file input; picking a file sends
 * the user to /processing, which validates and runs the match — same entry
 * point as the home Dropzone.
 */
export default function ResumeUploadButton({ className, onPicked, children }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // let the user re-pick the same file later
    if (!file) return;
    onPicked?.();
    navigate('/processing', { state: { file, filename: file.name, size: file.size } });
  }

  return (
    <>
      <button type="button" className={className} onClick={() => inputRef.current?.click()}>
        {children}
      </button>
      <input ref={inputRef} type="file" accept=".pdf,.docx" hidden onChange={handleChange} />
    </>
  );
}

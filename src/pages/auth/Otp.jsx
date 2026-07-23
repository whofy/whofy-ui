import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

export default function Otp() {
  const navigate = useNavigate();
  const boxRefs = useRef([]);

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  const maskedEmail = 's•••@example.com';

  /* Timer */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const code = digits.join('');
  const complete = code.length === 6 && /^\d{6}$/.test(code);

  function focusBox(i) {
    const el = boxRefs.current[i];
    if (el) { el.focus(); el.select(); }
  }

  function onDigit(index, e) {
    const raw = (e.target.value || '').replace(/\D/g, '');
    const next = [...digits];

    if (raw.length > 1) {
      const chars = raw.slice(0, 6).split('');
      chars.forEach((c, i) => {
        if (index + i < 6) next[index + i] = c;
      });
      setDigits(next);
      focusBox(Math.min(index + chars.length, 5));
      return;
    }

    next[index] = raw;
    setDigits(next);
    if (raw && index < 5) focusBox(index + 1);
  }

  function onKeydown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) focusBox(index - 1);
    if (e.key === 'ArrowLeft' && index > 0) focusBox(index - 1);
    if (e.key === 'ArrowRight' && index < 5) focusBox(index + 1);
  }

  function resend() {
    if (timer > 0) return;
    startTimer();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (!complete) {
      const firstEmpty = digits.findIndex((d) => !d);
      if (firstEmpty >= 0) focusBox(firstEmpty);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate('/auth/reset-password');
    }, 1000);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">

        <div className="auth-head">
          <div className="auth-brand">
            <div className="auth-brand-row">
              <div className="auth-brand-whofy-mark">W</div>
              <div className="auth-brand-whofy-name">Who<b>fy</b></div>
            </div>
            <div className="auth-brand-tag">One quick check to make sure it's really you.</div>
          </div>
          <div className="auth-lock" aria-hidden="true">
            <i className="fa fa-envelope-open-text"></i>
          </div>
        </div>

        <p className="auth-intro">
          We sent a <strong>6-digit code</strong> to <strong>{maskedEmail}</strong>.
          Enter it below to continue.
        </p>

        <form
          className={`auth-form${submitted ? ' was-submitted' : ''}`}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className="auth-otp-row">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (boxRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                className={`auth-otp-input${submitted && !digits[i] ? ' is-invalid' : ''}`}
                value={d}
                onChange={(e) => onDigit(i, e)}
                onKeyDown={(e) => onKeydown(i, e)}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {submitted && !complete && (
            <div className="auth-error" style={{ justifyContent: 'center', marginTop: -14, marginBottom: 16, position: 'relative' }}>
              <i className="fa fa-circle-exclamation"></i>
              <span>Please enter all 6 digits from the code we sent you.</span>
            </div>
          )}

          <div className="auth-otp-meta">
            {timer > 0 ? (
              <span>Resend available in <strong>{timer}s</strong></span>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); resend(); }}>Resend code</a>
            )}
            <Link to="/auth/login">Use a different account</Link>
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {!isLoading
              ? <span>Verify &amp; continue</span>
              : <span>Please wait <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></span>
            }
          </button>

          <div className="auth-divider">
            <span className="auth-divider-text">Or</span>
          </div>

          <div className="auth-foot">
            Wrong email? <Link to="/auth/forgot-password">Start again</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

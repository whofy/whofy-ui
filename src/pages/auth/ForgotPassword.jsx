import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const emailError =
    !email ? 'Please enter a valid email address.' :
    !EMAIL_RE.test(email) ? 'Please enter a valid email address.' : '';

  function handleSubmit(e) {
    e.preventDefault();
    setAttempted(true);
    if (emailError) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCodeSent(true);
      setTimeout(() => navigate('/auth/otp'), 600);
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
            <div className="auth-brand-tag">Forgot your password? We'll get you back in.</div>
          </div>
          <div className="auth-lock" aria-hidden="true">
            <i className="fa fa-key"></i>
          </div>
        </div>

        <p className="auth-intro">
          Enter the email address linked to your account and we'll send you a{' '}
          <strong>one-time code</strong> to reset your password.
        </p>

        <form
          className={`auth-form${attempted ? ' was-submitted' : ''}`}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className="auth-field form-floating">
            <input
              type="email"
              id="forgotEmail"
              className="form-control"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="forgotEmail">Email Address</label>
            {attempted && emailError && (
              <div className="auth-error">
                <i className="fa fa-circle-exclamation"></i>
                <span>{emailError}</span>
              </div>
            )}
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading || codeSent}>
            {!isLoading && !codeSent && <span>Send reset code</span>}
            {isLoading && (
              <span>Please wait <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></span>
            )}
            {codeSent && <span><i className="fa fa-check me-1"></i> Code sent</span>}
          </button>

          <div className="auth-divider">
            <span className="auth-divider-text">Or</span>
          </div>

          <div className="auth-foot">
            Remembered it? <Link to="/auth/login">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

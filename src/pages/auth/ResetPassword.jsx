import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

function getStrength(password) {
  if (!password) return { level: 0, label: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) score++;
  if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) score++;
  score = Math.min(score, 3);
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  return { level: score, label: labels[score] };
}

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const matches = !!password && password === confirm;
  const { level: strengthLevel, label: strengthLabel } = getStrength(password);

  const pwError =
    !password ? 'Password must be at least 6 characters long.' :
    password.length < 6 ? 'Password must be at least 6 characters long.' : '';
  const confirmError =
    !confirm ? 'Please retype your new password.' :
    !matches ? "The passwords don't match yet." : '';

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (pwError || confirmError) return;

    setIsLoading(true);
    setTimeout(() => {
      try { sessionStorage.setItem('abstrive.auth', '1'); } catch (_) {}
      navigate('/');
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
            <div className="auth-brand-tag">Set a new password to secure your account.</div>
          </div>
          <div className="auth-lock" aria-hidden="true">
            <i className="fa fa-shield-halved"></i>
          </div>
        </div>

        <p className="auth-intro">
          Choose a <strong>strong password</strong> you haven't used before.
          You'll be signed out of other sessions after saving.
        </p>

        <form
          className={`auth-form${submitted ? ' was-submitted' : ''}`}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          {/* New password */}
          <div className="auth-field">
            <div className="auth-pw-wrap form-floating">
              <input
                type={showPassword ? 'text' : 'password'}
                id="resetPassword"
                className="form-control"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="resetPassword">New password</label>
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {submitted && pwError && (
              <div className="auth-error">
                <i className="fa fa-circle-exclamation"></i>
                <span>{pwError}</span>
              </div>
            )}

            {/* Strength meter */}
            {password && (
              <div className="auth-strength" data-level={strengthLevel}>
                <div className="auth-strength-track">
                  <div className="auth-strength-seg"></div>
                  <div className="auth-strength-seg"></div>
                  <div className="auth-strength-seg"></div>
                </div>
                <span className="auth-strength-label">{strengthLabel}</span>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="auth-field">
            <div className="auth-pw-wrap form-floating">
              <input
                type={showConfirm ? 'text' : 'password'}
                id="resetConfirm"
                className="form-control"
                placeholder=" "
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <label htmlFor="resetConfirm">Confirm new password</label>
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                <i className={`fa ${showConfirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {submitted && confirmError && (
              <div className="auth-error">
                <i className="fa fa-circle-exclamation"></i>
                <span>{confirmError}</span>
              </div>
            )}
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {!isLoading
              ? <span>Update password</span>
              : <span>Please wait <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></span>
            }
          </button>

          <div className="auth-divider">
            <span className="auth-divider-text">Or</span>
          </div>

          <div className="auth-foot">
            <Link to="/auth/login">Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

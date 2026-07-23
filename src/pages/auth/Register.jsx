import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[A-Za-zÀ-ÿ' .\-]+$/;

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

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const nameError =
    !name ? 'Name must be at least 3 characters long.' :
    name.length < 3 ? 'Name must be at least 3 characters long.' :
    !NAME_RE.test(name) ? 'Name must be at least 3 characters long.' : '';
  const emailError =
    !email ? 'Please enter a valid email address.' :
    !EMAIL_RE.test(email) ? 'Please enter a valid email address.' : '';
  const pwError =
    !password ? 'Password must be at least 6 characters long.' :
    password.length < 6 ? 'Password must be at least 6 characters long.' : '';

  const { level: strengthLevel, label: strengthLabel } = getStrength(password);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (nameError || emailError || pwError || !accept) return;

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
            <div className="auth-brand-tag">Join us with confidence, your data's safety is our promise.</div>
          </div>
          <div className="auth-lock" aria-hidden="true">
            <i className="fa fa-lock"></i>
          </div>
        </div>

        <form
          className={`auth-form${submitted ? ' was-submitted' : ''}`}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          {/* Name */}
          <div className="auth-field form-floating">
            <input
              type="text"
              id="regName"
              className="form-control"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
            />
            <label htmlFor="regName">Full name</label>
            {submitted && nameError && (
              <div className="auth-error">
                <i className="fa fa-circle-exclamation"></i>
                <span>{nameError}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="auth-field form-floating">
            <input
              type="email"
              id="regEmail"
              className="form-control"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
            />
            <label htmlFor="regEmail">Email Address</label>
            {submitted && emailError && (
              <div className="auth-error">
                <i className="fa fa-circle-exclamation"></i>
                <span>{emailError}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="auth-pw-wrap form-floating">
              <input
                type={showPassword ? 'text' : 'password'}
                id="regPassword"
                className="form-control"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={isReadOnly}
                onFocus={() => setIsReadOnly(false)}
              />
              <label htmlFor="regPassword">Password</label>
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

          {/* Terms */}
          <label className={`auth-check${submitted && !accept ? ' is-invalid' : ''}`}>
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </span>
          </label>
          {submitted && !accept && (
            <div className="auth-error" style={{ position: 'relative', marginTop: -12, marginBottom: 14 }}>
              <i className="fa fa-circle-exclamation"></i>
              <span>Please accept the terms to continue.</span>
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {!isLoading
              ? <span>Sign me up</span>
              : <span>Please wait <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></span>
            }
          </button>

          <div className="auth-divider">
            <span className="auth-divider-text">Or sign up with</span>
          </div>

          <div className="auth-social-row">
            <button type="button" className="auth-social-btn social-google" aria-label="Sign up with Google">
              <svg viewBox="0 0 48 48" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </button>
            <button type="button" className="auth-social-btn social-github" aria-label="Sign up with GitHub">
              <i className="fab fa-github"></i>
            </button>
          </div>

          <div className="auth-foot">
            Already a member? Click <Link to="/auth/login">here</Link> to sign in.
          </div>
        </form>
      </div>
    </div>
  );
}

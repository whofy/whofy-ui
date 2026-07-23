import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  /* derived validation */
  const emailTouched = submitted;
  const emailError =
    !email ? 'Please enter a valid email address.' :
    !EMAIL_RE.test(email) ? 'Please enter a valid email address.' : '';
  const pwError =
    !password ? 'Password is required to continue.' :
    password.length < 6 ? 'Password should be at least 6 characters.' : '';

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (emailError || pwError) return;

    setIsLoading(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem('abstrive.auth', '1');
        localStorage.removeItem('sidebarScroll');
      } catch (_) {}
      navigate('/');
    }, 1000);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-head">
          <div className="auth-brand">
            <div className="auth-brand-row">
              <div className="auth-brand-whofy-mark">W</div>
              <div className="auth-brand-whofy-name">Who<b>fy</b></div>
            </div>
            <div className="auth-brand-tag">Your credentials, our commitment guarding your trust.</div>
          </div>
          <div className="auth-lock" aria-hidden="true">
            <i className="fa fa-lock"></i>
          </div>
        </div>

        {/* Form */}
        <form
          className={`auth-form${submitted ? ' was-submitted' : ''}`}
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          {/* Email */}
          <div className="auth-field form-floating">
            <input
              type="email"
              id="loginEmail"
              className="form-control"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isReadOnly}
              onFocus={() => setIsReadOnly(false)}
            />
            <label htmlFor="loginEmail">Email Address</label>
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
                id="loginPassword"
                className="form-control"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={isReadOnly}
                onFocus={() => setIsReadOnly(false)}
              />
              <label htmlFor="loginPassword">Password</label>
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
          </div>

          <div className="auth-forgot">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {!isLoading
              ? <span>Sign me in</span>
              : <span>Please wait <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span></span>
            }
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-text">Or sign in with</span>
          </div>

          {/* Social */}
          <div className="auth-social-row">
            <button type="button" className="auth-social-btn social-google" aria-label="Continue with Google">
              <svg viewBox="0 0 48 48" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </button>
            <button type="button" className="auth-social-btn social-github" aria-label="Continue with GitHub">
              <i className="fab fa-github"></i>
            </button>
          </div>

          <div className="auth-foot">
            Not a member yet? Click <Link to="/auth/register">here</Link> to register.
          </div>
        </form>
      </div>
    </div>
  );
}

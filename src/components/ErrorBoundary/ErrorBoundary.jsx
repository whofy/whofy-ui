import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <section className={styles.page}>
        <div className={styles.content}>
          <span className={styles.code}>Oops</span>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.sub}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button className="btn btn-theme btn-lg" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </div>
      </section>
    );
  }
}

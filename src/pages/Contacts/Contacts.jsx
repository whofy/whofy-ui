import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contacts.module.css';
import Dropdown from '../../components/Dropdown/Dropdown';

export default function Contacts() {
  const [topic, setTopic] = useState('');

  const TOPIC_OPTIONS = [
    { value: 'Resume Parsing Issue', label: 'Resume Parsing Issue' },
    { value: 'Match Accuracy Feedback', label: 'Match Accuracy Feedback' },
    { value: 'Account Support', label: 'Account Support' },
    { value: 'Privacy / Data Deletion', label: 'Privacy / Data Deletion Request' },
    { value: 'General Inquiry', label: 'General Inquiry' }
  ];
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          <div className={styles.left}>
            <h1 className={styles.pageHeader}>Get in touch</h1>
            <p className={styles.subtitle}>Have a question about your matches or need support? Drop us a message and our team will get back to you within 2-4 hours.</p>

            <div className={styles.info}>
              <div className={styles.item}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div>
                  <h4>Email support</h4>
                  <p><a href="mailto:whofyteam@gmail.com">whofyteam@gmail.com</a></p>
                </div>
              </div>
              <div className={styles.item}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <h4>Corporate office</h4>
                  <p>123 Startup Hub<br />Bangalore, India 560001</p>
                </div>
              </div>
            </div>

            <div className={styles.helpCallout}>
              <h4>Looking for quick answers?</h4>
              <p>90% of questions about resume parsing and match scores are answered in our Help Center.</p>
              <Link to="/faq">Visit Help Center &rarr;</Link>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.formCard}>
              <form className={styles.form} action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                <input type="hidden" name="subject" value="New Contact Form Submission from Whofy" />

                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required placeholder="Jane Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required placeholder="jane@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="topic">How can we help you?</label>
                  <Dropdown
                    id="topic"
                    name="topic"
                    required
                    value={topic}
                    onChange={setTopic}
                    options={TOPIC_OPTIONS}
                    placeholder="Select a topic..."
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={4} placeholder="Please provide details so our support team can assist you faster."></textarea>
              {submitted ? (
                <div className={styles.thanks}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.thanksCheck}><polyline points="20 6 9 17 4 12"/></svg>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out. We'll get back to you within 2-4 hours.</p>
                </div>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    fetch('https://api.web3forms.com/submit', {
                      method: 'POST',
                      body: formData,
                    }).catch(() => {});
                    setSubmitted(true);
                  }}
                >
                  <input type="hidden" name="access_key" value="6c7ef8d4-e53c-4e1b-9a18-0048230b5101" />
                  <input type="hidden" name="subject" value="New Contact Form Submission from Whofy" />

                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Jane Doe" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="jane@example.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="topic">How can we help you?</label>
                    <select id="topic" name="topic" required defaultValue="">
                      <option value="" disabled>Select a topic...</option>
                      <option value="Resume Parsing Issue">Resume Parsing Issue</option>
                      <option value="Match Accuracy Feedback">Match Accuracy Feedback</option>
                      <option value="Account Support">Account Support</option>
                      <option value="Privacy / Data Deletion">Privacy / Data Deletion Request</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" required rows={4} placeholder="Please provide details so our support team can assist you faster."></textarea>
                  </div>

                  <label className={styles.formCheckbox}>
                    <input type="checkbox" name="privacy_consent" required />
                    <span>I agree to the processing of my data according to the <Link to="/privacy">Privacy Policy</Link>.</span>
                  </label>

                <button type="submit" className={`btn btn-theme btn-lg ${styles.submitBtn}`}>
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                  <button type="submit" className="btn btn-theme btn-lg">
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

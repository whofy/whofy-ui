import LegalPage from './LegalPage.jsx';

export default function Cookies() {
  return (
    <LegalPage eyebrow="Cookies" title="Small files, small footprint." updated="July 2026" description="Whofy's cookie policy. We use minimal cookies to keep the site working, with no tracking or ads.">
      <div className="callout">
        <p><strong>Short version:</strong> We use cookies to remember your session and keep the site working. No tracking pixels, no ad networks.</p>
      </div>

      <h2>What is a cookie?</h2>
      <p>A cookie is a tiny bit of text your browser stores when you visit a site. It helps the site remember things between page loads, like whether you're signed in or what filters you last used.</p>

      <h2>Cookies Whofy uses</h2>

      <h3>Essential</h3>
      <p>These keep the site functional. Without them, basic features would break.</p>
      <ul>
        <li><strong>Session cookie</strong>, remembers your upload while you browse matches. Cleared when you close the tab.</li>
        <li><strong>Sign-in cookie</strong>, only set if you sign in (e.g., to save jobs). Removed when you sign out.</li>
      </ul>

      <h2>What we don't use</h2>
      <ul>
        <li>No advertising cookies</li>
        <li>No tracking pixels from third parties</li>
        <li>No cross-site retargeting</li>
      </ul>

      <h2>Managing cookies</h2>
      <p>You can clear or block cookies in your browser settings. If you block Whofy's essential cookies, some parts of the site (like keeping you signed in) may not work.</p>

      <h2>Contact</h2>
      <p>Questions about cookies? Reach us at <a href="mailto:whofyteam@gmail.com">whofyteam@gmail.com</a>.</p>
    </LegalPage>
  );
}

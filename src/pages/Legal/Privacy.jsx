import LegalPage from './LegalPage.jsx';

export default function Privacy() {
  return (
    <LegalPage eyebrow="Privacy" title="What we do with your data." updated="July 2026" description="Whofy's privacy policy. Learn what data we collect, how we use it, and how to control it.">
      <div className="callout">
        <p><strong>Short version:</strong> Your resume is read in the moment, matched to jobs, and forgotten when your session ends. We don't sell your data. We don't email you unless you ask us to.</p>
      </div>

      <h2>What we collect</h2>
      <p>We keep the collection narrow on purpose:</p>
      <ul>
        <li><strong>Your resume file</strong>, while your session is active, so we can parse skills and experience</li>
        <li><strong>Your email (Gmail ID)</strong>, only if you sign in to save jobs for later</li>
        <li><strong>Saved jobs</strong>, stored against your account so you can come back to them</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>Parse your resume to find matching jobs</li>
        <li>Show you a personalized shortlist</li>
        <li>Improve our matching over time</li>
        <li>Support you if you email us</li>
      </ul>

      <h2>How long we keep it</h2>
      <ul>
        <li><strong>Resume file:</strong> parsed in memory, discarded when your session ends</li>
        <li><strong>Extracted skills:</strong> held only for the length of your session</li>
        <li><strong>Gmail ID (if signed in):</strong> kept as long as your account exists</li>
        <li><strong>Saved jobs (if signed in):</strong> kept until you delete them or your account. Job listings in our database are refreshed every 28 days. If a saved job is removed by the employer or expires, it will be marked as "No longer available" but your save record is preserved</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We share data with tools we need to run the service:</p>
      <ul>
        <li><strong>Groq</strong>, for reading resume text and extracting skills</li>
        <li><strong>MongoDB Atlas (Mumbai region)</strong>, where the jobs database lives</li>
        <li><strong>Clerk</strong>, for authentication when you sign in</li>
      </ul>
      <p>We do not sell or rent your data to anyone.</p>

      <h2>Your controls</h2>
      <ul>
        <li>You can use Whofy without signing in</li>
        <li>You can close the tab any time; your uploaded resume goes with it</li>
        <li>If you have an account, you can delete it and your saved jobs</li>
      </ul>

      <h2>Security</h2>
      <p>Data moves between your browser and our servers over HTTPS. Access to our database is restricted. That said, no online service is 100% risk-free. If you spot something concerning, please let us know.</p>

      <h2>Contact</h2>
      <p>Questions or requests about your data? Email <a href="mailto:whofyteam@gmail.com">whofyteam@gmail.com</a>.</p>
    </LegalPage>
  );
}

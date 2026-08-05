import LegalPage from './LegalPage.jsx';

export default function Terms() {
  return (
    <LegalPage eyebrow="Terms of Use" title="How Whofy works with you." updated="July 2026" description="Terms of use for Whofy, the resume-first job matching platform.">
      <div className="callout">
        <p><strong>Plain English summary:</strong> Upload your resume, get matched to real jobs, apply directly. We don't charge you, we don't spam you, we don't sell your data.</p>
      </div>

      <h2>What Whofy does</h2>
      <p>Whofy is a resume-first job matching tool. You upload a PDF or DOCX resume; we parse it, score live job openings against your skills and experience, and show you a ranked shortlist. Applications happen on the employer's own careers page. Whofy is not the employer.</p>

      <h2>Using the service</h2>
      <p>You can use Whofy without creating an account. Some features (like saving jobs) may need you to sign in later. When you use Whofy, we ask you to:</p>
      <ul>
        <li>Upload only your own resume</li>
        <li>Use the site for real job hunting, not for scraping or automated queries</li>
        <li>Not try to break, overload, or reverse-engineer the platform</li>
      </ul>

      <h2>Job listings</h2>
      <p>The jobs shown on Whofy come from public company career pages and free job APIs. We try to keep listings fresh. New jobs are added every 24 hours and the full database is refreshed every 28 days, but we can't guarantee every listing is still open the moment you apply. Details like salary or location come straight from the employer's posting.</p>

      <h2>What Whofy is and isn't</h2>
      <p>Whofy helps you find opportunities that fit your resume. Whofy does not:</p>
      <ul>
        <li>Guarantee you'll get an interview or offer</li>
        <li>Represent you to companies</li>
        <li>Charge fees for job matches</li>
      </ul>

      <h2>Your content</h2>
      <p>Your resume belongs to you. Uploading it to Whofy lets us parse it for matching, but we don't claim ownership. We process it in memory and forget the file at the end of your session.</p>

      <h2>Changes</h2>
      <p>Whofy is still growing. We may update how features work as we build. If we make a change that affects how you use the site, we'll surface it clearly on the page.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Reach us at <a href="mailto:whofyteam@gmail.com">whofyteam@gmail.com</a>.</p>
    </LegalPage>
  );
}

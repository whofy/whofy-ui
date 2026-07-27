import Hero from './sections/Hero.jsx';
import Stats from './sections/Stats.jsx';
import WhyWhofy from './sections/WhyWhofy.jsx';
import Process from './sections/Process.jsx';
import Integrations from './sections/Integrations.jsx';
import Dropzone from '../../components/Dropzone/Dropzone.jsx';
import styles from './Home.module.css';

export default function Home() {
  function scrollToUpload() {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Hero onPickFile={scrollToUpload} />
      <Stats />
      <WhyWhofy />
      <section id="upload-section" className={styles.uploadSection}>
        <div className="container container-form">
          <div className={styles.uploadHead}>
            <div className={styles.eyebrow}>Get started</div>
            <h2>Ready to see your shortlist?</h2>
            <p>PDF or DOCX. Under a minute. No sign-up.</p>
          </div>
          <Dropzone />
        </div>
      </section>
      <Process />
      <Integrations />
    </>
  );
}

# Whofy — Comprehensive Project Master Document

This document is an exhaustive, file-by-file breakdown of the entire Whofy ecosystem. It covers both the Frontend (`whofy-ui`) and the Backend (`whofy-api`), detailing exactly what each directory and file does, the architectural decisions, and the current state of the codebase.

---

## Part 1: Project Concept & Architecture

**Whofy** is an AI-powered job matching engine. Instead of manual keyword searches, a user uploads a resume. The backend parses it using a Large Language Model (Groq LLaMA-3) to extract semantic skills, location, and experience. It then matches these parameters against a live MongoDB database of thousands of jobs (scraped from Greenhouse, Lever, etc.), scoring and ranking the most relevant ones.

---

## Part 2: Backend Ecosystem (`whofy-api`)

The backend is built with Python 3, FastAPI, PyMongo, and Groq's LLM API. 

### 1. Root Files
- `main.py`: The entry point. Initializes the FastAPI app, sets up CORS (Cross-Origin Resource Sharing), registers all API routers, and defines the app lifespan (which starts and stops the background job ingestion scheduler).
- `requirements.txt`: Defines Python dependencies: `fastapi`, `uvicorn`, `pymongo`, `pydantic`, `python-dotenv`, `python-jose`, `authlib` (for auth), `pymupdf`, `python-docx` (for parsing docs), `beautifulsoup4` (scraping), and `groq` (LLM integration).
- `test_mongo.py`: A utility script to verify the MongoDB connection.
- `.env` & `.env.example`: Configuration files holding API keys (e.g., `GROQ_API_KEY`, Mongo URI).

### 2. `/chatbot` — AI Assistant Module
Provides an AI assistant widget for the frontend to answer user queries about jobs and the platform.
- `router.py`: FastAPI routes for the chatbot endpoint.
- `chat_service.py`: Contains the `SYSTEM_PROMPT` instructing the bot (Llama-3.3) on how Whofy works. It processes incoming chat histories, invokes the Groq API, and handles Rate Limits.

### 3. `/config` — Environment Management
- `settings.py` (assumed): Uses Pydantic to load environment variables from the `.env` file cleanly and safely into the application context.

### 4. `/db` — Database Connection
- `mongo.py`: Handles the PyMongo connection pooling and provides a `get_db()` function that other modules use to access the MongoDB collections (`jobs` collection primarily).

### 5. `/fetch_api` — Primary Frontend API 
Handles all requests coming from the React frontend to fetch jobs and metadata.
- `jobs.py`: The core API file. 
  - `GET /api/matches`: Fetches job matches. It applies filters (location, company, type, experience), executes a MongoDB `$text` search using the user's parsed skills, and sends the raw candidate list to the matching algorithm (`rank_by_skills`).
  - `GET /api/search`: A manual text search endpoint leveraging `$text` indexes and ranking via `rank_by_search_query`.
  - `GET /api/locations`, `/api/companies`, `/api/sources`: Extract distinct values for frontend filter dropdowns.
  - `GET /api/jobs/{job_id}`: Fetches a single job.

### 6. `/listings` & `/sources` — Job Ingestion Pipeline
The background service that fetches and stores live jobs.
- `listings/scheduler.py`: A daemon thread launched at FastAPI startup. It runs every 24 hours, calling the ingestion pipeline (`run_all.py` / scraper logic) to update the MongoDB database with fresh jobs.
- `sources/shared/enrich.py` (and others): Contains functions (`detect_experience`, `detect_work_type`, `extract_required_skills`) that run when a job is scraped to structure its raw text before saving to Mongo.

### 7. `/matching` — The Recommendation Engine
- `ranker.py`: The algorithm powering Whofy.
  - `rank_by_skills()`: Takes MongoDB candidate jobs and the user's skill list. It iterates through job titles and descriptions to count how many skills match. It then sorts results first by recency, and then by match count.
  - `rank_by_search_query()`: A stricter token-matcher than Mongo's raw text search, ensuring better search relevance.

### 8. `/parsing` — Resume Processing
The engine that reads user resumes and understands them.
- `resume.py`: FastAPI router providing the upload endpoint.
- `resume_parser.py`: 
  - `extract_text()`: Uses `fitz` (PyMuPDF) for PDFs and `python-docx` for Word docs to extract raw strings.
  - `structure_resume()`: Sends the raw text to Groq (LLaMA-3) with a strict prompt forcing a JSON response matching `RESUME_SCHEMA`. Extracts an array of skills, location, experience, education, and summary.

### 9. `/pipeline` — Maintenance Scripts
- `fix_duplicate_skills.py`: A one-time database migration script to clean up duplicate text blocks in the MongoDB descriptions.
- `backfill_enrichment.py` & `cleanup.py`: Other utility scripts to clean old data or enrich existing docs.

---

## Part 3: Frontend Ecosystem (`whofy-ui`)

The frontend is a React 19 SPA (Single Page Application) built with Vite and React Router DOM v7. It strictly avoids utility CSS classes in favor of a heavily disciplined CSS Modules design system.

### 1. Root & Config
- `index.html`: The mounting point for the React app.
- `package.json`: Manages dependencies (`react`, `react-router-dom`) and dev tools (`vite`, `oxlint`).
- `vite.config.js`: Configuration for the Vite bundler.
- `systemDesign.md`: **Crucial documentation**. Outlines the exact CSS rules: no raw hex colors allowed in components, strict use of CSS variables, layered CSS logic (`reset`, `base`, `layout`, `utilities`), and rules for CSS module composition (`composes:`).

### 2. `/src` — The Core App
- `main.jsx`: Renders `<App />` and wraps it in the BrowserRouter.
- `App.jsx`: The central router. Defines routes for `/`, `/results`, `/processing`, `/careers`, `/faq`, `/about`, `/contacts`, `/legal/*`, and `/auth/*`. Controls global component visibility (like Navbar/Footer).

### 3. `/src/api` & `/src/utils` — Logic Layers
- `api/jobs.js`: Wraps `fetch` calls to the `whofy-api` backend (fetches matches, locations, etc).
- `utils/match.js`, `utils/sortJobs.js`: Client-side data helpers.
- `utils/resumePreferences.js`: Likely handles saving parsed resume state in `localStorage` or session.

### 4. `/src/hooks`
- `useJobFilters.js`: A custom React hook that manages the complex state of the job search filters (Location, Experience, Job Type, etc.) on the Results page.

### 5. `/src/styles` — The Design System
Following the `systemDesign.md` architecture:
- `index.css`: The master stylesheet that imports the CSS `@layer`s.
- `tokens.css`: The *only* place hex colors, spacings, typography scales, and shadows are defined as custom properties (`--primary`, `--bg-subtle`, `--fs-body`, etc.).
- `animations.css`: Shared `@keyframes` (e.g., `fadeIn`, `shimmer`).
- `shared/`: Contains generic component recipes (`button.module.css`, `surface.module.css`, `typography.module.css`). Components in `/components` compose their styles from here using CSS Module `composes:` syntax.

### 6. `/src/components` — Reusable UI
- `Navbar` & `Footer`: Global chrome.
- `Dropzone`: The UI element where users drag-and-drop their resume.
- `JobCard` & `DetailPane`: Used on the Results page to display job lists and the expanded job view.
- `FilterBar` & `SortControl`: Controls for filtering job search results.
- `ResumeGate`: A higher-order component or overlay that ensures users have uploaded a resume before accessing certain routes.
- `SkeletonCard` & `EmptyState`: UI loading states.
- `Brand`, `Dropdown`, `ScrollToTop`: UI Helpers.

### 7. `/src/pages` — Route Views
- `Home`: The landing page where the `Dropzone` is located for users to upload their resume.
- `Processing`: A loading state view while the `whofy-api` parses the uploaded resume via the LLM.
- `Results`: The core app view. Displays the matched `JobCard`s, handles `FilterBar` logic (via `useJobFilters.js`), and manages the `DetailPane`.
- `auth/`: Contains fully fleshed-out authentication views: `Login.jsx`, `Register.jsx`, `ForgotPassword.jsx`, `Otp.jsx`, `ResetPassword.jsx`, along with their shared `auth.css`.
- Static/Marketing Pages: `About`, `Careers`, `Contacts`, `FAQ`, and `Legal` (`Terms`, `Privacy`, `Cookies`).

### 8. `/src/chatbot`
- Holds the React component logic for the floating Chatbot widget that hits the `whofy-api/chatbot/router.py` endpoint.

---

## Part 4: Where We Stand

We have established a robust, highly modular architecture.
1. **The Backend is Alive:** FastAPI routes, MongoDB integration, the LLM resume-parsing engine (via Groq), the ranking algorithm, and the background job ingestion scheduler are all built and functional.
2. **The Frontend is Alive:** The Vite + React app runs perfectly. The custom, token-based CSS architecture is strictly implemented ensuring a high-end, cohesive visual language. Complex UI routing (Auth, Processing, Results) is scaffolded.
3. **The Data Flow:** A user can drop a resume, the frontend passes it to the backend, the backend structures it using AI, runs the ranking algorithm against MongoDB, and returns sorted job results to the UI.

**Next Immediate Priorities:**
- Finalize the integration of the `auth` views with backend security/token issuance (`python-jose`, `authlib`).
- Continuously monitor the LLM parsing accuracy.
- Ensure the job scraper (`listings/scheduler.py`) is successfully filling the database with clean, enriched data on a daily basis.

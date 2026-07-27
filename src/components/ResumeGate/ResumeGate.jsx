import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Routes that require an active resume-upload session.
// If the user lands on any of these via a browser refresh (not via in-app
// navigation), they've lost their session state, so send them home to
// re-upload.
const GATED_ROUTES = ['/results', '/processing'];

export default function ResumeGate() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFreshLoad = useRef(true);

  useEffect(() => {
    // This effect fires once, on the very first mount — i.e. either a fresh
    // page load or a browser refresh. If they landed directly on a gated
    // route, redirect them home.
    if (isFreshLoad.current) {
      isFreshLoad.current = false;
      if (GATED_ROUTES.includes(location.pathname)) {
        navigate('/', { replace: true });
      }
    }
    // We intentionally do NOT include `location.pathname` in deps — this
    // must only run on the very first mount so that in-app navigation
    // to /results (after upload) works normally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

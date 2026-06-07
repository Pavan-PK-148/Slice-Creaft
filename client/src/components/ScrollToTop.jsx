import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly force the window view parameters back to the top-left origin
    window.scrollTo(0, 0);
  }, [pathname]); // Fires cleanly every time the URL path string modifies

  return null;
}
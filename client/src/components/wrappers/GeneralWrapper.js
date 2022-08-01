// React
import { useEffect } from 'react';

export default function GeneralWrapper({ children, session }) {
  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);
  });

  return children;
};
import { useState, useEffect } from 'react';
import { isBrowser } from '@utils/isBrowser';

export const useWindowSize = () => {
  function getSize() {
    if (!isBrowser()) {
      return {};
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

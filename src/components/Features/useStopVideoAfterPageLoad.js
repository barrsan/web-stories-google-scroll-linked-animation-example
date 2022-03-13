import { useEffect, useRef } from 'react';

const TIMEOUT_MS = 500;

export const useStopVideoAfterPageLoad = ({
  activeIndex,
  currentIndex,
  refVideo,
}) => {
  const refInitWindowScrollY = useRef(null);

  useEffect(() => {
    const currentScrollY = window.scrollY;
    let timeout;

    if (refInitWindowScrollY.current === null) {
      refInitWindowScrollY.current = currentScrollY;
    }

    if (
      refInitWindowScrollY.current === currentScrollY &&
      activeIndex !== currentIndex
    ) {
      timeout = setTimeout(() => {
        refVideo.current.pause();
      }, TIMEOUT_MS);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex]);
};

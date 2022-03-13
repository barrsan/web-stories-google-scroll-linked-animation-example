import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useViewportScroll } from 'framer-motion';
import { useWindowSize } from '@hooks/useWindowSize';
import { breakpoints, phone } from '@constants';
import { homeAtoms } from '@components/Home';
import { heroAtoms } from './state';

const { LG_POINT } = breakpoints;
const { PHONE_XS_HEIGHT } = phone;

export const usePhoneScrollHandler = ({ phoneOffsetTop = 0 }) => {
  const [isFixedPhone, setIsFixedPhone] = useState(false);
  const [isPhoneInEnd, setIsPhoneInEnd] = useState(false);
  const [isActiveStories, setIsActiveStories] = useState(false);

  const [isDark, seIsDark] = useRecoilState(homeAtoms.isDarkAtom);
  const heroFooterHeight = useRecoilValue(heroAtoms.heroFooterHeightAtom);

  const { scrollY } = useViewportScroll();

  const { width } = useWindowSize();

  const isWide = width > LG_POINT;

  const endScrollOffsetY = isWide ? heroFooterHeight : PHONE_XS_HEIGHT;

  const handlePhoneScroll = (y) => {
    const start = phoneOffsetTop;
    const end = phoneOffsetTop + endScrollOffsetY;

    if (y >= start && !isFixedPhone) {
      setIsFixedPhone(true);
    } else if (y < start && isFixedPhone) {
      setIsFixedPhone(false);
    }

    if (y >= end && !isPhoneInEnd) {
      setIsPhoneInEnd(true);
    } else if (y < end && isPhoneInEnd) {
      setIsPhoneInEnd(false);
    }

    if (y >= end + 100 && isDark) {
      seIsDark(false);
    } else if (y < end + 100 && isActiveStories && !isDark) {
      seIsDark(true);
    }

    if (y >= start + 50 && !isActiveStories) {
      setIsActiveStories(true);
      seIsDark(true);
    } else if (y < start + 50 && isActiveStories) {
      setIsActiveStories(false);
      seIsDark(false);
    }
  };

  useEffect(() => {
    const initialScrollYValue = scrollY.get();
    handlePhoneScroll(initialScrollYValue);

    scrollY.onChange((scrollYValue) => {
      handlePhoneScroll(scrollYValue);
    });

    return () => {
      scrollY.clearListeners();
    };
  }, [
    width,
    phoneOffsetTop,
    heroFooterHeight,
    isActiveStories,
    isFixedPhone,
    isPhoneInEnd,
  ]);

  return {
    isFixedPhone,
    isPhoneInEnd,
    isActiveStories,
    endScrollOffsetY,
  };
};

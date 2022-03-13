import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';
import { motion, useAnimation } from 'framer-motion';
import { useWindowSize } from '@hooks/useWindowSize';
import VideoHero1 from '@assets/videos/hero_discover.mp4';
import VideoHero2 from '@assets/videos/hero_tappable.mp4';
import { usePhoneScrollHandler } from './usePhoneScrollHandler';
import { heroAtoms } from './state';
import * as styles from './HeroPhone.module.css';

const phoneMotionVariants = {
  initial: {
    y: 764,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.3,
      ease: 'easeOut',
    },
  },
  scaleOn: {
    scale: 0.825,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  scaleOff: {
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const storiesMotionVariants = {
  initial: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function HeroPhone() {
  const [phoneOffsetTop, setPhoneOffsetTop] = useState(0);

  const setIsPhoneAnimationComplete = useSetRecoilState(
    heroAtoms.isPhoneAnimationCompletedAtom,
  );

  const refVideoHero = useRef();
  const refVideoStories = useRef();
  const refPhone = useRef();
  const phoneAnimationControls = useAnimation();

  const { width } = useWindowSize();

  const { isFixedPhone, isActiveStories, isPhoneInEnd, endScrollOffsetY } =
    usePhoneScrollHandler({ phoneOffsetTop });

  useEffect(() => {
    function handleStorageEvent() {
      const isLoadComplete = !!localStorage.getItem('isLoadComplete');

      if (isLoadComplete) {
        phoneAnimationControls.start('visible');
      }
    }

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  useEffect(() => {
    const top = refPhone.current.offsetTop;
    setPhoneOffsetTop(top);
  }, [width]);

  useEffect(() => {
    if (isActiveStories) {
      phoneAnimationControls.start('scaleOn');

      if (refVideoStories.current) {
        refVideoStories.current.play();
      }
    } else {
      phoneAnimationControls.start('scaleOff');
    }
  }, [isActiveStories]);

  const handlePhoneAnimationComplete = useCallback((definition) => {
    if (definition === 'visible') {
      refVideoHero.current.play();
      setIsPhoneAnimationComplete(true);
    }
  }, []);

  const handlePhoneFrameAnimationComplete = useCallback(() => {
    if (!isActiveStories && refVideoStories.current) {
      refVideoStories.current.pause();
      refVideoStories.current.currentTime = 0;
    }
  }, [isActiveStories]);

  return (
    <div
      ref={refPhone}
      className={clsx(
        'absolute z-10',
        'bottom-0 lg:bottom-[-200px] left-[calc(50%_-_105px)] lg:left-[calc(50%_-_182px)]',
        'w-[210px] h-[441px] lg:w-[364px] lg:h-[764px]',
        'my-0 mx-auto',
      )}
    >
      <motion.div
        className="w-[210px] h-[441px] lg:w-[364px] lg:h-[764px] [will-change:transform]"
        initial="initial"
        animate={phoneAnimationControls}
        variants={phoneMotionVariants}
        onAnimationComplete={handlePhoneAnimationComplete}
        style={{
          position: isFixedPhone && !isPhoneInEnd ? 'fixed' : 'relative',
          top: 0,
          translateY: isPhoneInEnd ? endScrollOffsetY : 0,
        }}
      >
        <div
          className={clsx(
            styles.phoneFrame,
            'absolute',
            'bottom-[-215px] left-[-10%]',
            'w-[147.25275%] h-[130.62827%]',
            'bg-position-phone-frame bg-size-phone-frame bg-no-repeat',
            'overflow-hidden',
          )}
        >
          <motion.div
            className={clsx(
              'absolute z-[2]',
              'top-[5%] left-[6.9%]',
              'w-[210px] h-[441px] lg:w-[364px] lg:h-[764px]',
              'overflow-hidden rounded-[31px] [backface-visibility:hidden]',
            )}
            initial="initial"
            animate={isActiveStories ? 'hidden' : 'visible'}
            variants={storiesMotionVariants}
            onAnimationComplete={handlePhoneFrameAnimationComplete}
          >
            <video
              ref={refVideoHero}
              className="absolute inset-0"
              playsInline
              muted
              src={VideoHero1}
            />
          </motion.div>
          <div
            className={clsx(
              'absolute',
              'top-[5%] left-[6.9%]',
              'w-[210px] h-[441px] lg:w-[364px] lg:h-[764px]',
              'overflow-hidden rounded-[31px] [backface-visibility:hidden]',
              '[-webkit-mask-image:-webkit-radial-gradient(white,_black)]',
            )}
          >
            <video
              ref={refVideoStories}
              className="absolute inset-0"
              playsInline
              muted
              src={VideoHero2}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroPhone;

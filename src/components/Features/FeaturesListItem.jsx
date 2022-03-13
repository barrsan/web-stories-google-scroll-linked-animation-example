import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useWindowSize } from '@hooks/useWindowSize';
import { getPercent } from '@utils/getPercent';
import { twClasses } from '@constants';
import VideoFeature1 from '@assets/videos/featureCards_completeControl.mp4';
import VideoFeature2 from '@assets/videos/featureCards_onBrand.mp4';
import VideoFeature3 from '@assets/videos/featureCards_immersive.mp4';
import VideoFeature4 from '@assets/videos/featureCards_connect.mp4';
import { featuresAtoms } from './state';
import { useStopVideoAfterPageLoad } from './useStopVideoAfterPageLoad';

const { FEATURE_DECORATION_BG_CLASSES, FEATURE_COVER_BG_CLASSES } = twClasses;

const FEATURES_VIDEOS = [
  VideoFeature1,
  VideoFeature2,
  VideoFeature3,
  VideoFeature4,
];

const motionVariants = {
  initial: {
    opacity: 1,
  },
  active: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 0.3,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function FeaturesListItem({ index, title, description, featuresTotalCount }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [activeIndex, setActiveIndex] = useRecoilState(
    featuresAtoms.activeIndexAtom,
  );

  const ref = useRef();
  const refVideo = useRef();
  const refScrollY = useRef(0);

  const { height } = useWindowSize();

  const computeFeatureActiveIndex = () => {
    const scrollYAbs = Math.abs(refScrollY.current);
    const { offsetTop } = ref.current;
    const { top } = ref.current.getBoundingClientRect();
    const percent = getPercent({ partial: top, total: height });

    if (index === 0 && activeIndex === 0 && percent > 60) {
      setActiveIndex(-1);
    }

    if (
      index === featuresTotalCount - 1 &&
      activeIndex === featuresTotalCount - 1 &&
      scrollYAbs > offsetTop &&
      percent <= 0
    ) {
      setActiveIndex(index + 1);
    }

    if (activeIndex !== index && scrollYAbs <= offsetTop && percent <= 60) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (activeIndex === index) {
      refVideo.current.play().then(() => {
        setIsPlaying(true);
      });
    } else if (isPlaying) {
      refVideo.current.pause();
    }
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    computeFeatureActiveIndex();
  }, [height]);

  useStopVideoAfterPageLoad({
    activeIndex,
    currentIndex: index,
    refVideo,
  });

  useScrollPosition(
    ({ currPos }) => {
      const { y: scrollY } = currPos;
      refScrollY.current = scrollY;
      computeFeatureActiveIndex();
    },
    [height, activeIndex],
  );

  return (
    <div ref={ref} className="lg:pt-[12vh] pb-20 lg:pb-[8vh] lg:mb-[30vh]">
      <div
        className={clsx([
          'block lg:hidden py-9',
          FEATURE_COVER_BG_CLASSES[index],
        ])}
      >
        <div className="mx-auto max-w-[288px] w-[57%]">
          <video
            ref={refVideo}
            className={clsx(['block'])}
            layout="fill"
            loop
            muted
            autoPlay
            src={FEATURES_VIDEOS[index]}
          />
        </div>
      </div>
      <motion.div
        variants={motionVariants}
        initial="initial"
        animate={activeIndex !== index ? 'inactive' : 'active'}
      >
        <h3
          className={clsx([
            'relative block pb-4 pt-6 lg:pt-0',
            'text-[28px] font-medium text-center lg:text-left',
            'lg:before:content-[""] lg:before:block',
            'lg:before:absolute lg:before:top-[-10px] lg:before:left-0',
            'lg:before:w-[36px] lg:before:h-[3px]',
            FEATURE_DECORATION_BG_CLASSES[index],
          ])}
        >
          {title}
        </h3>
        <p className="text-base leading-6 text-center lg:text-left">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

export default FeaturesListItem;

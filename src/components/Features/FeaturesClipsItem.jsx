import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { twClasses } from '@constants';
import { useStopVideoAfterPageLoad } from './useStopVideoAfterPageLoad';
import { featuresAtoms, featuresSelectors } from './state';

const { FEATURE_VIDEO_CLASSES } = twClasses;

const motionVariants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function FeaturesClipsItem({
  index,
  totalFeaturesCount,
  videoSrc,
  overlayClassName = '',
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const activeIndex = useRecoilValue(featuresAtoms.activeIndexAtom);
  const visibleIndexes = useRecoilValue(
    featuresSelectors.visibleIndexesSelector,
  );

  const refVideo = useRef();

  useEffect(() => {
    if (activeIndex === index) {
      refVideo.current.play().then(() => {
        setIsPlaying(true);
      });
    } else if (isPlaying) {
      refVideo.current.pause();
    }
  }, [activeIndex, isPlaying]);

  useStopVideoAfterPageLoad({
    activeIndex,
    currentIndex: index,
    refVideo,
  });

  let clipProps = {};

  if (index > 0) {
    clipProps = {
      variants: motionVariants,
      initial: 'initial',
      animate:
        visibleIndexes.includes(index) || activeIndex === totalFeaturesCount
          ? 'active'
          : 'inactive',
    };
  }

  return (
    <motion.div
      className={clsx([
        'absolute top-0 left-0',
        'w-full h-full',
        'flex justify-center items-center overflow-hidden',
      ])}
      {...clipProps}
    >
      <motion.div
        className={clsx([
          'absolute top-0 left-0',
          'w-full h-full',
          'flex-1 text-center overflow-hidden',
          overlayClassName,
        ])}
        variants={motionVariants}
        initial="initial"
        animate={activeIndex === index ? 'active' : 'inactive'}
      />
      <div
        className={clsx([
          'relative',
          'w-full h-[71%]',
          'flex-1 text-center overflow-hidden',
          FEATURE_VIDEO_CLASSES[index],
        ])}
      >
        <video
          ref={refVideo}
          className={clsx([
            'block absolute inset-0',
            'w-0 h-0 min-w-full min-h-full max-w-full max-h-full',
            'object-contain',
          ])}
          layout="fill"
          loop
          muted
          autoPlay
          src={videoSrc}
        />
      </div>
    </motion.div>
  );
}

export default FeaturesClipsItem;

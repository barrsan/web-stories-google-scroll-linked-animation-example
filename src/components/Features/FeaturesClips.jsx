import React, { memo, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { motion, useAnimation } from 'framer-motion';
import { twClasses } from '@constants';
import featuresData from '@content/features.yaml';
import VideoFeature1 from '@assets/videos/featureCards_completeControl.mp4';
import VideoFeature2 from '@assets/videos/featureCards_onBrand.mp4';
import VideoFeature3 from '@assets/videos/featureCards_immersive.mp4';
import VideoFeature4 from '@assets/videos/featureCards_connect.mp4';
import { featuresSelectors } from './state';
import FeaturesClipsItemCover from './FeaturesClipsItemCover';
import FeaturesClipsItem from './FeaturesClipsItem';

const { FEATURE_COVER_BG_CLASSES } = twClasses;

const FEATURES_VIDEOS = [
  VideoFeature1,
  VideoFeature2,
  VideoFeature3,
  VideoFeature4,
];

const clipsContainerMotionVariants = {
  initial: {
    y: '100%',
  },
  active: {
    y: '0%',
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

const clipsMotionVariants = {
  initial: {
    y: '-160%',
    scale: 1.5,
    opacity: 0,
  },
  active: {
    y: '0%',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

function FeaturesClips() {
  const [isFirstShown, setIsFirstShown] = useState(false);

  const visibleIndexes = useRecoilValue(
    featuresSelectors.visibleIndexesSelector,
  );

  const clipsWrapperControls = useAnimation();
  const clipsControls = useAnimation();

  useEffect(() => {
    if (!isFirstShown && visibleIndexes.length) {
      clipsWrapperControls.start('active');
      clipsControls.start('active');
      setIsFirstShown(true);
    }
  }, [visibleIndexes]);

  return (
    <div
      className={clsx([
        'sticky top-0 left-0',
        'w-full h-screen',
        'overflow-hidden',
        'pointer-events-none',
      ])}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className={clsx([
            'absolute top-6 left-6 right-6',
            'w-[calc(100%-48px)] h-[calc(100%-48px)]',
            'overflow-hidden',
          ])}
        >
          <motion.div
            className={clsx([
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden',
            ])}
            variants={clipsContainerMotionVariants}
            initial="initial"
            animate={clipsWrapperControls}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              variants={clipsMotionVariants}
              initial="initial"
              animate={clipsControls}
            >
              {featuresData.items.map((i, index) => {
                return (
                  <FeaturesClipsItemCover
                    key={`feature-overlay-${i.id}`}
                    className={FEATURE_COVER_BG_CLASSES[index]}
                    isVisible={visibleIndexes.includes(index)}
                  />
                );
              })}
              {featuresData.items.map((i, index) => {
                return (
                  <FeaturesClipsItem
                    key={`feature-${i.id}`}
                    index={index}
                    totalFeaturesCount={featuresData.items.length}
                    videoSrc={FEATURES_VIDEOS[index]}
                    overlayClassName={FEATURE_COVER_BG_CLASSES[index]}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default memo(FeaturesClips);

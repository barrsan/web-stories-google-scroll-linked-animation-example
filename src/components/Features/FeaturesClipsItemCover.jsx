import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const motionVariants = {
  initial: {
    opacity: 0,
  },
  active: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function FeaturesClipsItemCover({ className = '', isVisible = false }) {
  return (
    <motion.div
      className={clsx(['absolute top-0 left-0', 'w-full h-full', className])}
      variants={motionVariants}
      initial="initial"
      animate={isVisible ? 'active' : 'inactive'}
    />
  );
}

export default FeaturesClipsItemCover;

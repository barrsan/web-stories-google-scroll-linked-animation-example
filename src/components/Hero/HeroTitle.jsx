import React, { useEffect } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const motionVariants = {
  initial: {
    y: '100%',
  },
  visible: (i) => ({
    y: 0,
    transition: {
      delay: (i + 5) * 0.1,
      ease: 'easeOut',
    },
  }),
};

function HeroTitle({ title, isStrongFirstWord = true, visible = false }) {
  const animationControls = useAnimation();

  const titleChunks = title.split(' ');

  useEffect(() => {
    if (visible) {
      animationControls.start('visible');
    }
  }, [visible]);

  const renderTitle = () => {
    return (
      <>
        {titleChunks.map((i, index) => {
          return (
            <span key={i} className="relative inline-block overflow-hidden">
              <motion.span
                className="pt-3 pl-3 inline-block [will-change:transform]"
                initial="initial"
                animate={animationControls}
                variants={motionVariants}
                custom={index}
              >
                {index === 0 && isStrongFirstWord ? <strong>{i}</strong> : i}
              </motion.span>
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'max-w-full sm:max-w-[462px] lg:max-w-[735px] w-full h-full',
        'mx-auto px-4 lg:px-0',
      )}
    >
      <h1
        className={clsx(
          'relative',
          'top-[-200px] lg:top-[-300px]',
          'text-center text-[38px] leading-8 lg:text-6xl',
        )}
      >
        <AnimatePresence>{visible && renderTitle()}</AnimatePresence>
      </h1>
    </div>
  );
}

export default HeroTitle;

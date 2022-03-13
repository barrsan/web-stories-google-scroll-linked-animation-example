import React, { useEffect } from 'react';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import CollageVideo1 from '@assets/videos/story_travel.mp4';
import CollageVideo2 from '@assets/videos/story_headphones.mp4';
import CollageImage1 from '@assets/images/collage_image_1.jpg';
import CollageImage2 from '@assets/images/collage_image_2.jpg';
import CollageImage3 from '@assets/images/collage_image_3.jpg';
import CollageImage4 from '@assets/images/collage_image_4.jpg';
import { heroAtoms } from './state';

const COLLAGE_IMAGES = [
  CollageImage1,
  CollageImage2,
  CollageImage3,
  CollageImage4,
];

const motionVariants = {
  initial: (i) => {
    return {
      y: `${i}%`,
    };
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

function HeroCollage() {
  const isCompletePhoneAnimation = useRecoilValue(
    heroAtoms.isPhoneAnimationCompletedAtom,
  );
  const animationControls = useAnimation();

  useEffect(() => {
    if (isCompletePhoneAnimation) {
      animationControls.start('visible');
    }
  }, [isCompletePhoneAnimation]);

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="absolute bottom-0 left-[calc(50%_-_182px)] w-[364px] h-full scale-[.57692] lg:scale-100">
        <motion.div
          className={clsx(
            'absolute bottom-[30px] left-[-360px] lg:bottom-[-10px] lg:left-[-630px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={180}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.58] lg:scale-[.72] rounded-2xl',
            )}
          >
            <img
              className="absolute inset-0"
              src={COLLAGE_IMAGES[0]}
              alt="Google Stories Landing Clone"
            />
          </div>
        </motion.div>
        <motion.div
          className={clsx(
            'absolute bottom-[100px] right-[-360px] lg:bottom-[-10px] lg:right-[-630px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={180}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.58] lg:scale-[.72] rounded-2xl',
            )}
          >
            <img
              className="absolute inset-0"
              src={COLLAGE_IMAGES[3]}
              alt="Google Stories Landing Clone"
            />
          </div>
        </motion.div>
        <motion.div
          className={clsx(
            'absolute bottom-[-260px] left-[-160px] lg:bottom-[-50px] lg:left-[-450px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={200}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.68] lg:scale-[.85] rounded-2xl',
            )}
          >
            <img
              className="absolute inset-0"
              src={COLLAGE_IMAGES[1]}
              alt="Google Stories Landing Clone"
            />
          </div>
        </motion.div>
        <motion.div
          className={clsx(
            'absolute bottom-[-200px] right-[-160px] lg:bottom-[-60px] lg:right-[-450px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={200}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.68] lg:scale-[.85] rounded-2xl',
            )}
          >
            <img
              className="absolute inset-0"
              src={COLLAGE_IMAGES[2]}
              alt="Google Stories Landing Clone"
            />
          </div>
        </motion.div>
        <motion.div
          className={clsx(
            'absolute bottom-[20px] left-[-205px] lg:bottom-[-10px] lg:left-[-240px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={140}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.8] lg:scale-100 rounded-2xl',
            )}
          >
            <video playsInline muted autoPlay loop src={CollageVideo1} />
          </div>
        </motion.div>
        <motion.div
          className={clsx(
            'absolute bottom-[80px] right-[-205px] lg:bottom-[30px] lg:right-[-240px]',
            'w-[200px] h-[360px]',
            '[will-change:transform]',
          )}
          initial="initial"
          animate={animationControls}
          variants={motionVariants}
          custom={140}
        >
          <div
            className={clsx(
              'absolute top-0 left-0',
              'w-full h-full',
              'overflow-hidden scale-[.8] lg:scale-100 rounded-2xl',
            )}
          >
            <video playsInline muted autoPlay loop src={CollageVideo2} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroCollage;

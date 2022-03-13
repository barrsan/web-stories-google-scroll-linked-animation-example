import React from 'react';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { Hero } from '@components/Hero';
import { Features } from '@components/Features';
import { Footer } from '@components/Footer';
import { colors } from '@constants';
import { homeAtoms } from './state';

const { WHITE_COLOR, BLACK_COLOR } = colors;

const motionVariants = {
  initial: {
    backgroundColor: WHITE_COLOR,
  },
  light: {
    backgroundColor: WHITE_COLOR,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  dark: {
    backgroundColor: BLACK_COLOR,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

function Home() {
  const isDark = useRecoilValue(homeAtoms.isDarkAtom);

  return (
    <motion.div
      initial="initial"
      animate={isDark ? 'dark' : 'light'}
      variants={motionVariants}
    >
      <Hero />
      <Features />
      <Footer />
    </motion.div>
  );
}

export default Home;

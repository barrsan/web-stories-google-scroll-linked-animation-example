import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import heroData from '@content/hero.yaml';
import HeroTitle from './HeroTitle';
import HeroCollage from './HeroCollage';
import HeroPhone from './HeroPhone';
import HeroFooter from './HeroFooter';
import { heroAtoms } from './state';

function Hero() {
  const [titleVisible, setTitleVisible] = useState(false);
  const isCompletePhoneAnimation = useRecoilValue(
    heroAtoms.isPhoneAnimationCompletedAtom,
  );

  useEffect(() => {
    if (isCompletePhoneAnimation) {
      setTitleVisible(true);
    }
  }, [isCompletePhoneAnimation]);

  return (
    <div className="overflow-hidden">
      <div className="relative h-full">
        <div className="relative min-h-[720px] lg:min-h-[1038px] h-screen">
          <HeroTitle title={heroData.mainTitle} visible={titleVisible} />
          <HeroPhone />
          <HeroCollage />
        </div>
        <HeroFooter />
      </div>
    </div>
  );
}

export default Hero;

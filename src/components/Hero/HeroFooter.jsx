import React, { useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { useSetRecoilState } from 'recoil';
import { useWindowSize } from '@hooks/useWindowSize';
import heroData from '@content/hero.yaml';
import BrandImage1 from '@assets/images/brand_image_1.png';
import BrandImage2 from '@assets/images/brand_image_2.png';
import BrandImage3 from '@assets/images/brand_image_3.png';
import BrandImage4 from '@assets/images/brand_image_4.png';
import BrandImage5 from '@assets/images/brand_image_5.png';
import BrandImage6 from '@assets/images/brand_image_6.png';
import { heroAtoms } from './state';

const LOGO_IMAGES = [
  BrandImage1,
  BrandImage2,
  BrandImage3,
  BrandImage4,
  BrandImage5,
  BrandImage6,
];

function HeroFooter() {
  const setHeroFooterHeight = useSetRecoilState(heroAtoms.heroFooterHeightAtom);
  const refHeroFooter = useRef();
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    if (refHeroFooter.current) {
      const rect = refHeroFooter.current.getBoundingClientRect();
      setHeroFooterHeight(rect.height);
    }
  }, [width]);

  return (
    <div
      ref={refHeroFooter}
      className="mx-auto lg:py-96 mt-48 lg:mt-96 w-full max-w-7xl"
    >
      <div className="h-[442px] lg:h-0 lg:hidden" />
      <div
        className={clsx(
          'flex flex-col lg:flex-row lg:justify-between',
          'mb-0 lg:mb-64 px-4 lg:px-0',
          'text-lg text-white',
        )}
      >
        <div className="w-full mb-14 lg:mb-0 pl-0 lg:pl-6 lg:w-96">
          <p>{heroData.description}</p>
        </div>
        <div className="w-full pr-0 lg:pr-6 lg:w-96 text-sm">
          <p>{heroData.brandsTitle}</p>
          <div
            className={clsx(
              'flex flex-wrap flex-row',
              'justify-evenly content-evenly lg:justify-between lg:content-between',
              'py-4 h-[200px] lg:h-[150px]',
            )}
          >
            {LOGO_IMAGES.map((i) => (
              <img className="w-[120px] h-[50px]" key={i} src={i} alt="" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroFooter;

import React from 'react';
import clsx from 'clsx';
import featuresData from '@content/features.yaml';

function FeaturesTitle() {
  return (
    <div className="w-full">
      <div
        className={clsx(
          'mx-auto pt-64 pb-32 lg:pt-44 lg:pb-64',
          'max-w-[300px] lg:max-w-[900px] w-full',
        )}
      >
        <h1 className="text-[38px] lg:text-6xl text-center leading-[48px] font-semibold">
          {featuresData.mainTitle}
        </h1>
      </div>
    </div>
  );
}

export default FeaturesTitle;

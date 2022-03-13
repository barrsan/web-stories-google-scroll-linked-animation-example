import React from 'react';
import clsx from 'clsx';
import featuresData from '@content/features.yaml';
import FeaturesClips from './FeaturesClips';
import FeaturesListItem from './FeaturesListItem';

function FeaturesList() {
  return (
    <div className="flex w-full mx-0">
      <div className="flex-1">
        <div
          className={clsx([
            'mx-auto pb-[180px] px-6 lg:px-0',
            'lg:max-w-[336px]',
          ])}
        >
          <h2
            className={clsx([
              'mx-auto pt-16 lg:pt-[360px] pb-6 lg:pb-0',
              'max-w-[336px] lg:max-w-full',
              'text-4xl font-medium text-center lg:text-left',
            ])}
          >
            {featuresData.listTitle}
          </h2>
          {featuresData.items.map((i) => {
            return (
              <FeaturesListItem
                key={i.id}
                index={i.id}
                title={i.title}
                description={i.description}
                featuresTotalCount={featuresData.items.length}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-1 hidden lg:block">
        <FeaturesClips />
      </div>
    </div>
  );
}

export default FeaturesList;

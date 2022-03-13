import { selector } from 'recoil';
import featuresData from '@content/features.yaml';
import { activeIndexAtom } from './atoms';

export const visibleIndexesSelector = selector({
  key: 'featuresSelector/visibleIndexes',
  get: ({ get }) => {
    const activeIndex = get(activeIndexAtom);
    const indexes = [];
    const countFeatures = featuresData.items.length;

    if (activeIndex === -1 || activeIndex >= countFeatures) {
      return indexes;
    }

    if (activeIndex === countFeatures - 1) {
      return Array(countFeatures)
        .fill()
        .map((_, index) => index);
    }

    for (let i = 0; i <= activeIndex; i += 1) {
      indexes.push(i);
    }

    return indexes;
  },
});

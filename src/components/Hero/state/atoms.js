import { atom } from 'recoil';

export const isPhoneAnimationCompletedAtom = atom({
  key: 'hero/phone/isAnimationComplete',
  default: false,
});

export const heroFooterHeightAtom = atom({
  key: 'hero/footer/height',
  default: 0,
});

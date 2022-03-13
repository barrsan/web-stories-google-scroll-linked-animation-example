import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'app/isDark',
  default: false,
});

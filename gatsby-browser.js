import React from 'react';
import { RecoilRoot } from 'recoil';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const onClientEntry = () => {
  window.onload = () => {
    setTimeout(() => {
      window.localStorage.setItem('isLoadComplete', 'true');
      window.dispatchEvent(new Event('storage'));
    }, 1000);
  };
};

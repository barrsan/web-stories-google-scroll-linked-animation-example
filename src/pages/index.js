import React from 'react';
import { Seo } from '@components/Seo';
import { Home } from '@components/Home';

const IndexPage = () => (
  <div>
    <Seo title="Home" />
    <Home />
  </div>
);

export default IndexPage;

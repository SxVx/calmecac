import React from 'react';
import CenterView from '../CenterView';

const withCenterVIew = (Story, context) => (
  <CenterView>
    <Story {...context} />
  </CenterView>
);

export default withCenterVIew;

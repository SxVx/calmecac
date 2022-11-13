import { Theme } from '@core/theme/theme';

declare global {
  type Spacing = 'margin' | 'padding';

  type SpacingValues = 'X' | 'Y' | 'Top' | 'Bottom' | 'Left' | 'Right';

  export type SpacingProps = Partial<{
    [key in `${Spacing}${SpacingValues}`]: string;
  }>;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '*.jpg';
declare module '*.pdf';
declare module '*.jpge';
declare module '*.gif';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

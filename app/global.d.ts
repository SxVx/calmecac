import { RootStackParamList } from '@core/routes/utils/types';
import {} from '@core/theme';
import { Theme } from '@core/theme/theme';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
  type Spacing = 'margin' | 'padding';

  type SpacingValues = 'X' | 'Y' | 'Top' | 'Bottom' | 'Left' | 'Right';

  export type SpacingProps = Partial<{
    [key in `${Spacing}${SpacingValues}`]: number | string;
  }>;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

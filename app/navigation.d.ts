import { RootStackParamList } from '@core/routes/utils/types';

declare global {
  namespace ReactNavigation {
    interface RooParamList extends RootStackParamList {}
  }
}

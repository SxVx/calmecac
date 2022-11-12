import { RootStackParamList } from '@core/routes/utils/types';

const ROUTES: Record<string, keyof RootStackParamList> = {
  HOME: 'Home',
  LOGIN: 'Login',
  COURSE: 'Course',
};

export default ROUTES;

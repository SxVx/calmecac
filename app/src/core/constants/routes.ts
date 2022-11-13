import { RootStackParamList } from '@core/routes/utils/types';

type RouteRecord = { [x: string]: keyof RootStackParamList };

const ROUTES: RouteRecord = {
  LOGIN: 'Login',
  COURSE: 'Course',
  MY_COURSES: 'MyCourses',
  SEARCH: 'Search',
  HOME: 'Home',
  NOTIFICATIONS: 'Notifications',
  PROFILE: 'Profile',
  TAB_NAVIGATOR: 'TabNavigator',
};

export default ROUTES;

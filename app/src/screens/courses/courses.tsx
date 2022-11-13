import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import courses from '@core/utils/mocks/courses';
import { AirbnbRating, Badge, Card } from '@rneui/base';
import theme from '@core/theme';
import Typography from '@core/ut-kit/typography';
import CourseList from '@core/shared/hooks/components/course-list';

const Courses = () => {
  return (
    <>
      <Typography variant="mediumBold" marginLeft="sm">
        My courses
      </Typography>

      <React.Suspense fallback={<Typography>Loading...</Typography>}>
        <CourseList data={courses.data} showReview={false} />
      </React.Suspense>
    </>
  );
};

export default Courses;

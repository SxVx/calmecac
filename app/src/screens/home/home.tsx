import axiosInstance from '@core/api/axiosInstance';
import ROUTES from '@core/constants/routes';
import { RootStackParamList } from '@core/routes/utils/types';
import useAuth from '@core/shared/hooks/useAuth';
import theme from '@core/theme';
import Typography from '@core/ut-kit/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Badge, Button, LinearProgress } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import axios from 'axios';
import React from 'react';
import {
  FlatListProps,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import courses from '@core/utils/mocks/courses';
import onGoingCourse from './utils/mock/onGoingCourse';

type Course = typeof courses.data[number];

const renderItem =
  onNavigate =>
  ({ item }: { item: Course }) =>
    (
      <TouchableOpacity
        onPress={() => onNavigate(ROUTES.COURSE, { course: item })}
        activeOpacity={0.8}
      >
        <Card containerStyle={styles.itemContainerStyle}>
          <Typography variant="mediumBold" marginY="sm">
            {item.title}
          </Typography>
          <Card.Image source={{ uri: item.image }} />
          <Typography>{item.teacher}</Typography>
          <Typography>{item.description}</Typography>
          <Badge
            value={<Typography>{item.category}</Typography>}
            status="primary"
            badgeStyle={styles.badgeStyle}
          />
          <AirbnbRating
            isDisabled
            count={5}
            reviews={['']}
            size={20}
            defaultRating={item.rating}
            starContainerStyle={styles.starContainerStyle}
          />
        </Card>
      </TouchableOpacity>
    );

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation: { navigate } }: Props) => {
  const [coursesList, setCoursesList] = React.useState<Course[]>([]);
  const { data } = useQuery(['/'], param => axiosInstance());

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCoursesList(courses.data);
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <StatusBar animated translucent backgroundColor="transparent" />
      <Container>
        <React.Suspense fallback={<Typography>Loading...</Typography>}>
          <StyledFlatList<React.ComponentType<FlatListProps<Course>>>
            data={coursesList}
            renderItem={renderItem(navigate)}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <Typography variant="mediumBold">On Going</Typography>

                <Pressable
                  onPress={() =>
                    navigate(ROUTES.COURSE, { course: onGoingCourse })
                  }
                >
                  <Card wrapperStyle={styles.onGoingCourse}>
                    <Avatar
                      source={{
                        uri: 'https://source.unsplash.com/random?sig=2',
                      }}
                      size="large"
                    />
                    <CourseDetails>
                      <Typography variant="bold">
                        {onGoingCourse.title}
                      </Typography>
                      <Typography>Lecturer: {onGoingCourse.teacher}</Typography>
                      <Typography marginBottom="sm">Progress</Typography>
                      <LinearProgress
                        value={onGoingCourse.progress}
                        trackColor="red"
                      />
                    </CourseDetails>
                  </Card>
                </Pressable>

                <Typography variant="mediumBold" marginY="m">
                  Explore More courses
                </Typography>
              </>
            }
          />
        </React.Suspense>
      </Container>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  onGoingCourse: {
    flexDirection: 'row',
  },
  starContainerStyle: {
    alignSelf: 'flex-start',
    marginTop: -30,
  },
  badgeStyle: {
    backgroundColor: theme.colors.background.quinary,
    paddingHorizontal: theme.spacing.xs,
    height: 20,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.s,
  },
  itemContainerStyle: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 0,
  },
});

const StyledFlatList = styled.FlatList`
  width: 100%;
  flex-wrap: wrap;
`;

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const CourseDetails = styled.View`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

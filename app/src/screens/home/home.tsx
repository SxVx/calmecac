import ROUTES from '@core/constants/routes';
import { RootStackParamList } from '@core/routes/utils/types';
import useAuth from '@core/shared/hooks/useAuth';
import theme from '@core/theme';
import Typography from '@core/ut-kit/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import { Card } from '@rneui/themed';
import { AirbnbRating } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import {
  FlatListProps,
  Pressable,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import courses from './utils/mock/courses';

type Course = typeof courses.data[number];

const renderItem =
  onNavigate =>
  ({ item }: { item: Course }) =>
    (
      <TouchableOpacity
        onPress={() => onNavigate(ROUTES.COURSE, { course: item })}
        activeOpacity={0.8}
      >
        <Card
          containerStyle={{
            backgroundColor: theme.colors.background.secondary,
            borderWidth: 0,
          }}
        >
          <Typography variant="mediumBold" marginY="sm">
            {item.title}
          </Typography>
          <Card.Image source={{ uri: item.image }} />
          <Typography>{item.teacher}</Typography>
          <Typography>{item.description}</Typography>
          <AirbnbRating
            isDisabled
            count={5}
            reviews={['']}
            size={20}
            defaultRating={item.rating}
            starContainerStyle={{ alignSelf: 'flex-start', marginTop: -20 }}
          />
        </Card>
      </TouchableOpacity>
    );

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation: { navigate } }: Props) => {
  const [coursesList, setCoursesList] = React.useState<Course[]>([]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCoursesList(courses.data);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Container>
      <StatusBar
        animated
        translucent
        backgroundColor={theme.colors.background.primary}
      />
      <StyledFlatList<React.ComponentType<FlatListProps<Course>>>
        data={coursesList}
        renderItem={renderItem(navigate)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Home;

const StyledFlatList = styled.FlatList`
  width: 100%;
  flex-wrap: wrap;
`;

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

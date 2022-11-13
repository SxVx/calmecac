import theme from '@core/theme';
import Typography from '@core/ut-kit/typography';
import { AirbnbRating, Badge, Card } from '@rneui/themed';
import React from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Props extends FlatListProps<any> {
  data: any;
  showReview?: boolean;
}

const renderItem =
  (showReview: boolean) =>
  ({ item }) =>
    (
      <TouchableOpacity>
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
          {showReview && (
            <AirbnbRating
              isDisabled
              count={5}
              reviews={['']}
              size={20}
              defaultRating={item.rating}
              starContainerStyle={styles.starContainerStyle}
            />
          )}
        </Card>
      </TouchableOpacity>
    );

const CourseList = ({ data, showReview = true, ...rest }: Props) => {
  return (
    <FlatList
      data={data}
      // @ts-ignore
      renderItem={renderItem(showReview)}
      {...rest}
    />
  );
};

export default CourseList;

const styles = StyleSheet.create({
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

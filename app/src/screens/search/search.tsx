import {
  View,
  Text,
  SectionList,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { AirbnbRating, Card, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Octicons';
import Typography from '@core/ut-kit/typography';
import { Badge } from '@rneui/base';
import theme from '@core/theme';
import courses from '@screens/home/utils/mock/courses';

const renderItem = ({ item }) => (
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

const Search = () => {
  const [searchValue, setSearch] = React.useState('');

  const courserList = courses.data.filter(item =>
    item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  return (
    <View>
      <Input
        leftIcon={<Icon name="search" size={28} />}
        value={searchValue}
        placeholder="Search"
        onChangeText={setSearch}
      />

      <React.Suspense fallback={<Typography>Loading...</Typography>}>
        <FlatList data={courserList} renderItem={renderItem} />
      </React.Suspense>
    </View>
  );
};

export default Search;

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

import { LogBox, Text, View } from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Octicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Typography from '@core/ut-kit/typography';

LogBox.ignoreLogs([/Expected.*/]);

const tabSettings = [
  {
    label: 'My Courses',
    icon: 'bookmark',
  },
  {
    label: 'Home',
    icon: 'home',
  },
  {
    label: 'Discover',
    icon: 'search',
  },
  {
    label: 'My profile',
    icon: 'feed-person',
  },
];

const Item = ({ label, icon, isFocused, onPress }) => (
  <StyledTouchable
    activeOpacity={isFocused ? 1 : 0.8}
    onPress={onPress(isFocused)}
  >
    <Icon name={icon} size={isFocused ? 32 : 24} color="#000" />
    <Typography>{label}</Typography>
  </StyledTouchable>
);

type Props = BottomTabBarProps;

const TabBar = ({ navigation, state }: Props) => {
  const { routes, index } = state;

  const tabs = React.useMemo(() => {
    return routes.map(({ key, name }, index) => {
      const onPress = (isFocused: boolean) => () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) navigation.navigate(name);
      };

      return {
        ...tabSettings[index],
        isFocused: state.index === index,
        onPress,
      };
    });
  }, [routes, index]);

  return (
    <Container>
      {tabs.map((tab, index) => (
        <Item key={index} {...tab} />
      ))}
    </Container>
  );
};

export default TabBar;

const StyledTouchable = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 9,
  },
  shadowOpacity: 0.48,
  shadowRadius: 11.95,

  elevation: 1,
};

const Container = styled.View`
  flex-direction: row;
  min-height: 60px;
  ${shadow}
`;

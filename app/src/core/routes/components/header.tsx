import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@core/ut-kit/typography';

const Header = () => {
  return (
    <Container>
      <Logo source={require('../../assets/images/logo.jpg')} />
    </Container>
  );
};

export default Header;

const Container = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

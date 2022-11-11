import Typography from '@core/ut-kit/typography';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '@rneui/themed';

const Login = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.primary} />

      <Container>
        <Typography>Welcome to Calmecac</Typography>
        <Typography align="center">
          The Web3 learning platform become the professional you wanna become!
        </Typography>
        <Button>
          <Typography>Sync in with Metamask</Typography>
        </Button>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  ${({ theme }) => `
    background-color: ${theme.colors.background.primary};
  `}
  justify-content: center;
  align-items: center;
`;

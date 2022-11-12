import Typography from '@core/ut-kit/typography';
import React from 'react';
import {
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import MetamaskIcon from '@core/assets/images/metamask.svg';
import Video from 'react-native-video';

const Login = () => {
  const theme = useTheme();
  const connection = useWalletConnect();

  const onLogin = async () => {
    try {
      await connection?.connect?.();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.primary} />

      <Container>
        <StyledVideo
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          resizeMode="cover"
          repeat
          volume={0.0}
        />
        <Typography>Welcome to Calmecac</Typography>
        <Typography align="center">
          Your Web3 learning platform to become a professional!
        </Typography>
        <Button
          onPress={onLogin}
          icon={<MetamaskIcon height={25} width={25} />}
          type="outline"
          raised={false}
          radius={10}
          iconPosition="left"
        >
          <Typography>Connect with Metamask</Typography>
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

const StyledVideo = styled(Video)`
  ${StyleSheet.absoluteFill}
  z-index: -1;
`;

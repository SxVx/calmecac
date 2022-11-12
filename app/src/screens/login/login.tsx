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
import styled from 'styled-components/native';
import { Button } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import MetamaskIcon from '@core/assets/images/metamask.svg';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import theme from '@core/theme';

const Login = () => {
  const connection = useWalletConnect();
  const [volume, setVolume] = React.useState(0);

  const onLogin = async () => {
    try {
      await connection?.connect?.();
    } catch (error) {
      console.warn(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setVolume(0);
    }, []),
  );

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.primary} />

      <Container>
        <Typography>Welcome to Calmecac</Typography>
        <Typography align="center">
          Your Web3 learning platform to become a professional!
        </Typography>
        <Button
          onPress={onLogin}
          icon={<MetamaskIcon height={25} width={25} />}
          raised={false}
          radius={10}
          iconPosition="left"
          buttonStyle={styles.buttonStyle}
          type="outline"
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

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
});

import Typography from '@core/ut-kit/typography';
import React from 'react';
import { Image, Linking, StatusBar, Text, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import MetamaskIcon from '@core/assets/images/metamask.svg';

const Login = () => {
  const theme = useTheme();
  const connection = useWalletConnect();

  const onLogin = async () => {
    await connection?.connect?.();
  };

  const onSetBinance = async () => {
    const deepLink = 'metamask://SettingsFlow/NetworksSettings/';

    if (await Linking.canOpenURL(deepLink)) {
      await Linking.openURL(deepLink);
    }
  };

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
          type="outline"
          raised={false}
          radius={10}
          iconPosition="left"
        >
          <Typography>Log in with Metamask</Typography>
        </Button>
        <Button
          onPress={onSetBinance}
          icon={<MetamaskIcon height={25} width={25} />}
          type="outline"
          raised={false}
          radius={10}
          iconPosition="left"
        >
          <Typography>Set up Binance test network</Typography>
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

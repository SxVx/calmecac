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

import MetamaskIcon from '@core/assets/images/icons/metamask.svg';

import { useFocusEffect } from '@react-navigation/native';
import theme from '@core/theme';

import { useMutation } from 'react-query';
import axiosInstance from '@core/api/axiosInstance';

const Login = ({ navigation: { setOptions } }) => {
  const connection = useWalletConnect();
  const [volume, setVolume] = React.useState(0);
  const { mutateAsync } = useMutation(() =>
    axiosInstance<any>({
      url: '/v1/auth/login',
      method: 'post',
    }),
  );

  const onLogin = async () => {
    try {
      await connection?.connect?.();

      const data = await mutateAsync(undefined, {
        email: 'correoTest1@calmecac.com',
        password: 'P4ssw0rd?gX',
        wallet_hash: connection?.accounts?.[0],
      });

      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setVolume(0);
    }, []),
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerShown: false,
      tabBarShowLabel: false,
    });
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

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
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
});

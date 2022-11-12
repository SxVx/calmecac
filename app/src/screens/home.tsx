import useAuth from '@core/shared/hooks/useAuth';
import { Button } from '@rneui/base';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  const connection = useWalletConnect();

  const { connected } = connection;

  const onLogout = async () => {
    await connection?.killSession?.();
  };

  return (
    <View>
      <Text>Hello</Text>
      {connected && <Button onPress={onLogout}>Disconnect</Button>}
    </View>
  );
};

export default Home;

import useAuth from '@core/shared/hooks/useAuth';
import Typography from '@core/ut-kit/typography';
import { Button } from '@rneui/base';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import { View } from 'react-native';

import parseWallet from './utils/parseWallet';

const Home = () => {
  const connection = useWalletConnect();

  const { connected } = connection;

  const onLogout = async () => {
    await connection?.killSession?.();
  };

  return (
    <View>
      <Typography>Wallet: {parseWallet(connection?.accounts?.[0])}</Typography>

      {connected && <Button onPress={onLogout}>Disconnect wallet</Button>}
    </View>
  );
};

export default Home;

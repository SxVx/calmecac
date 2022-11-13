import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Button } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Typography from '@core/ut-kit/typography';
import parseWallet from './utils/parseWallet';
import theme from '@core/theme';
import styled from 'styled-components/native';

import profile from './utils/mock/profile';

const Profile = () => {
  const connection = useWalletConnect();

  const { connected } = connection;

  const onLogout = async () => {
    await connection?.killSession?.();
  };

  return (
    <Container>
      <Avatar rounded size={100} source={{ uri: profile.image }} />

      <Typography>Wallet: {parseWallet(connection?.accounts?.[0])}</Typography>

      {connected && (
        <Button
          onPress={onLogout}
          raised={false}
          radius={10}
          iconPosition="left"
          buttonStyle={styles.buttonStyle}
          type="outline"
        >
          <Typography>Disconnect wallet</Typography>
        </Button>
      )}
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
});

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
`;

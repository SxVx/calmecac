import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Avatar, Badge, Button } from '@rneui/themed';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import Typography from '@core/ut-kit/typography';
import parseWallet from './utils/parseWallet';
import theme from '@core/theme';
import styled from 'styled-components/native';

import profile from './utils/mock/profile';
import { Card } from '@rneui/base';
import ROUTES from '@core/constants/routes';

const Profile = ({ navigation: { navigate } }) => {
  const connection = useWalletConnect();

  const onLogout = async () => {
    await connection?.killSession?.();
  };

  return (
    <Container>
      <Avatar rounded size={100} source={{ uri: profile.image }} />

      <Typography variant="medium">{profile.name}</Typography>

      <Typography>Wallet: {parseWallet(connection?.accounts?.[0])}</Typography>

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
      <Body>
        <StyledCard>
          <Typography>Notifications</Typography>
        </StyledCard>
        <StyledCard>
          <Typography>Settings</Typography>
        </StyledCard>
        <StyledCard>
          <Typography>About</Typography>
        </StyledCard>
        <TouchableOpacity
          onPress={() => navigate(ROUTES.MY_COURSES)}
          activeOpacity={0.8}
        >
          <StyledCard>
            <Typography>My courses</Typography>
          </StyledCard>
        </TouchableOpacity>
      </Body>
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

const Body = styled.View`
  align-self: stretch;
`;

const StyledCard = styled(Card)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

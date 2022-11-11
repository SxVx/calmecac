import { createContext } from 'react';

export type State = {
  isSignedIn: boolean;
  userName: string;
  walletHash: string;
};

export type AuthContextType = {
  authState: State;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext(<AuthContextType>{});

export default AuthContext;

import { createContext } from 'react';

export type State = {
  isSignedIn: boolean;
  walletHash: string;
};

export type AuthContextType = {
  authState: State;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext(<AuthContextType>{});

export default AuthContext;

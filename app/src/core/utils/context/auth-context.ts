import { createContext } from 'react';

export type State = {
  isSignedIn: boolean;
  wallet: string;
};

export type AuthContextType = {
  authState: State;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext(<AuthContextType>{});

export default AuthContext;

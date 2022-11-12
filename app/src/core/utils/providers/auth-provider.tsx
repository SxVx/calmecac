import {
  useWalletConnect,
  useWalletConnectContext,
} from '@walletconnect/react-native-dapp';
import { connect } from 'formik';
import React from 'react';
import AuthContext, { type State } from '../context/auth-context';

const initialState: State = {
  isSignedIn: false,
  walletHash: '',
};

const TYPE = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
} as const;

type AuthAction = {
  type: keyof typeof TYPE;
  payload?: Omit<State, 'isSignedIn'>;
};

const reducer = (prevState: State, action: AuthAction): State => {
  const { type, payload } = action;

  const reducer = {
    SIGN_IN: { ...prevState, ...payload, isSignedIn: true },
    SIGN_OUT: { ...initialState, isSignedIn: false },
  };

  return reducer[type] ?? prevState;
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [authState, authReducer] = React.useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = React.useState(false);

  const connection = useWalletConnect();

  const login = React.useCallback(async () => {
    try {
      const result = await connection?.connect?.();
      authReducer({
        type: TYPE.SIGN_IN,
        payload: {
          walletHash: result.accounts[0],
        },
      });
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const logout = React.useCallback(async () => {
    console.warn(connection.connected);

    try {
      if (connection?.connected) {
        await connection?.killSession?.();
        authReducer({ type: TYPE.SIGN_OUT });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    const { connected, session } = connection;

    const newState = {
      type: TYPE[connected ? 'SIGN_IN' : 'SIGN_OUT'],
      payload: {
        walletHash: connected ? session?.accounts[0] : '',
      },
    };

    authReducer(newState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import {
  useWalletConnect,
  useWalletConnectContext,
} from '@walletconnect/react-native-dapp';
import { connect } from 'formik';
import React from 'react';
import AuthContext, { type State } from '../context/auth-context';

const initialState: State = {
  isSignedIn: false,
  wallet: '',
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
  const [isLoading, setIsLoading] = React.useState(true);

  const connection = useWalletConnect();

  const login = React.useCallback(async () => {
    try {
      const result = await connection?.connect?.();

      authReducer({
        type: TYPE.SIGN_IN,
        payload: {
          wallet: result.accounts[0],
        },
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const { connected, session } = connection;

    const newState = {
      type: TYPE[connected ? 'SIGN_IN' : 'SIGN_OUT'],
      payload: {
        wallet: connected ? session?.accounts[0] : '',
      },
    };

    authReducer(newState);
    setIsLoading(false);
  }, [connection.connected]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authState,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React from 'react';
import AuthContext, { type State } from '../context/auth-context';

const initialState: State = {
  isSignedIn: false,
  userName: '',
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

  const login = React.useCallback(() => {
    authReducer({
      type: TYPE.SIGN_IN,
      payload: {
        userName: 'John Doe',
        walletHash: '0x1234567890',
      },
    });
  }, []);

  const logout = React.useCallback(() => {
    authReducer({ type: TYPE.SIGN_OUT });
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

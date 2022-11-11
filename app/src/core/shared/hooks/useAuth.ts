import { useContext } from 'react';
import AuthContext from '@core/utils/context/auth-context';

const useAuth = () => useContext(AuthContext);

export default useAuth;

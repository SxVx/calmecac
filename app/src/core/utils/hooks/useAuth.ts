import { useContext } from 'react';
import AuthContext from '../context/auth-context';

const useAuth = () => useContext(AuthContext);

export default useAuth;

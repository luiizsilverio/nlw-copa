import { useContext } from "react";
import { AuthContextProps, AuthContext } from '../contexts/auth-context';

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  return context;
}
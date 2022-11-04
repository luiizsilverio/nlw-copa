import { createContext, useState, useEffect, ReactNode } from "react";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ENV } from '../../src/.env.js';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextProps {
  user: UserProps;
  signIn: () => Promise<void>
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: ENV.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsLoading(true);
      await promptAsync();
    } 
    catch (error) {
      console.warn(error);
      throw error;
    }
    finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log(access_token);
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response])


  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoading,
    }}>
      { children }
    </AuthContext.Provider>
  )
}


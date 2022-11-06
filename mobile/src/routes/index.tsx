import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../screens/signin';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/use-auth';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {
        user.name ? <AppRoutes /> : <SignIn />
      }
    </NavigationContainer>
  )
}
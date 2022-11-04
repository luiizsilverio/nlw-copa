import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/loading';
import { AuthContextProvider } from './src/contexts/auth-context';
import { SignIn } from './src/screens/signin';
import { New } from './src/screens/new';
import { Find } from './src/screens/find';
import { Pools } from './src/screens/pools';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>    
        <AuthContextProvider>

          <StatusBar 
            barStyle="light-content"      
            backgroundColor="transparent"
            translucent
          />

          {
            fontsLoaded ? <Pools /> : <Loading />
          }
          
      </AuthContextProvider> 
    </NativeBaseProvider>
  );
}

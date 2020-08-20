import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/AuthContext';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <NavigationContainer>
      { signed 
        ? <AppStack />
        : <AuthStack />
      }
    </NavigationContainer>
  );
}

export default Routes;
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register1 from '../pages/Register1';
import Register2 from '../pages/Register2';
import RegisterCompleted from '../pages/RegisterCompleted';

const { Navigator, Screen } = createStackNavigator();

function AuthStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="Register1" component={Register1} />
      <Screen name="Register2" component={Register2} />
      <Screen name="RegiterCompleted" component={RegisterCompleted} />
    </Navigator>
  );
}

export default AuthStack;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

import { FavoriteTeachersProvider } from '../contexts/favoriteTeachersContext';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <FavoriteTeachersProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </FavoriteTeachersProvider>
  );
}

export default AppStack;
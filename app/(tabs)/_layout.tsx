import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '@/components/CustomTabBar';
import { useTheme } from '@/contexts/ThemeContext';

import HomeScreen from './index';
import DiscoverScreen from './discover';
import FriendsScreen from './friends';
import ConversationsScreen from './conversations';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.background,
      }}
    >
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="discover" component={DiscoverScreen} />
      <Tab.Screen name="friends" component={FriendsScreen} />
      <Tab.Screen name="conversations" component={ConversationsScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
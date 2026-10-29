import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from '../screens/ProfileScreen';
import AppIcon from '../components/AppIcon';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 5,
        },

        tabBarIcon: ({ color, focused }) => {
          // Search SVG icon
          if (route.name === 'Search') {
            return (
              <View style={styles.iconContainer}>
                <AppIcon name="search" size={25} color={color}/>
              </View>
            );
          }

          // Cart SVG icon
          if (route.name === 'Cart') {
            return (
              <AppIcon name="cart" size={25} color={color}/>
            );
          } 

          //home svg icon
          if(route.name === 'Home'){
            return (
              <AppIcon name="home" size={25} color={color} />
            )
          }

          //history svg icon
          if(route.name === 'History'){
            return (
              <AppIcon name="history" size={25} color={color} />
            )
          }

          //profile svg icon
          if(route.name === 'Profile'){
            return (
              <AppIcon name="profile" size={25} color={color} />
            )
          }

          // Home and Profile text icons
          return (
            <Text
              style={{
                color,
                fontSize: 25,
                fontWeight: focused ? '700' : '400',
              }}
            >
              {tabIcons[route.name]}
            </Text>
          );
        },

        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 7,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
          borderTopColor: '#e3e3e4',
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = {
  iconContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
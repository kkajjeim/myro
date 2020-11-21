import 'react-native-gesture-handler';
import React, {useEffect, useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LoginScreen,
  SignupScreen,
  MypageScreen,
  MyHabitScreen,
  MainScreen,
} from '@screens';

import AuthContext from '@hooks/authContext';
import Globalstyle from '@constants/style';

const Tab = createBottomTabNavigator();

const App = () => {
  const [token, setToken] = useState(
    async () => await AsyncStorage.getItem('userToken'),
  );
  const saveToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
  };
  const authProviderValue = useMemo(() => ({token, saveToken}), [
    token,
    saveToken,
  ]);
  return (
    <AuthContext.Provider value={authProviderValue}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            style: {
              backgroundColor: Globalstyle.MAIN_DARK,
            },
            activeTintColor: Globalstyle.MAIN_WHITE,
            inactiveTintColor: Globalstyle.MAIN_WHITE,
          }}>
          <Tab.Screen name="Home" component={MainScreen} />
          <Tab.Screen name="MyHabit" component={MyHabitScreen} />
          <Tab.Screen
            name="Info"
            // component={token ? MypageScreen : AuthStackScreen}
            component={token ? AuthStackScreen : MypageScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Globalstyle.MAIN_DARK,
        },
        headerTintColor: Globalstyle.MAIN_WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

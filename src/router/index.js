import React from 'react';
import Login from '../screens/Login';
import {StackNavigator, SwitchNavigator, TabNavigator} from 'react-navigation';

const Router = () => {
  return <div />;
};

export const SignedOut = StackNavigator({
  //   Signup: {
  //     screen: Signup,
  //     navigationOptions: {
  //       title: 'Sign Up',
  //     },
  //   },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Log In',
    },
  },
});

export const LoggedIn = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: {},
    },
  },
  // Settings: {
  //   screen: Settings,
  //   navigationOptions: {
  //     tabBarLabel: 'Home',
  //     tabBarIcon: {},
  //   },
  // },
});

const AuthNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Home: HomeScreen
});

export const createAppNavigator = (loggedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: LoggedIn,
      },
      SignedOut: {
        screen: Signedout,
      },
    },
    {initialRouteName: loggedIn ? 'LoggedIn' : 'SignedOut'},
  );
};

export default Router;

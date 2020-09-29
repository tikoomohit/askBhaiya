import React from 'react';
import {AsyncStorage, Easing, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from './src/screens/Login';
import SplashScreen from './src/screens/SplashScreen';
import Dashboard from './src/screens/Dashboard';
import OTPVerify from './src/screens/OTPVerify';
import {AuthContext} from './src/utils/AuthContext';

const StackActions = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {duration: 500, easing: Easing.linear},
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);

  // const [state, dispatch] = React.useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case 'SIGN_IN':
  //         return {...prevState, isSignOut: false, userToken: action.token};
  //       case 'RESTORE_TOKEN':
  //         return {...prevState, isLoading: false, userToken: action.token};
  //       case 'SIGN_OUT':
  //         return {...prevState, isSignOut: true, userToken: null};
  //     }
  //   },
  //   {isLoading: true, isSignout: false, userToken: false},
  // );

  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async data => {
  //       dispatch({type: 'SIGN_IN', token: 'auth-token'});
  //     },
  //     completeProfile: () => dispatch({type: 'COMPLETE_PROFILE'}),
  //     signOut: () => dispatch({type: 'SIGN_OUT'}),
  //   }),
  //   [],
  // );

  return (
    // <AuthContext.Provider value={authContext}>
    <NavigationContainer style={Styles.AppContainer}>
      <StackActions.Navigator
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          // transitionSpec: {open: config, close: closeConfig},
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        headerMode="float"
        animation="fade">
        <StackActions.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <StackActions.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackActions.Screen name="OTPVerify" component={OTPVerify} />
        <StackActions.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
          // options={{title: 'Sign In'}}
        />
        {/* {isLoading ? (
          //Fetching the user token
          <StackActions.Screen name="Splash" component={SplashScreen} />
        ) : userToken == null ? (
          //user is not logged in
          <StackActions.Screen name="Login" component={Login} />
        ) : (
          <StackActions.Screen
            name="Home"
            component={Home}
            // options={{title: 'Sign In'}}
          />
        )} */}
        {/*
          <View style={Styles.AppsContainer}>
            <Login />
          </View> */}
      </StackActions.Navigator>
    </NavigationContainer>
    // </AuthContext.Provider>
  );
}

const Styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

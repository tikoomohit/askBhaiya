import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SplashIcon from '../assets/SplashIcon';

const SplashScreen = () => {
  return (
    <View style={Styles.Container}>
      <SplashIcon />
      <Text style={Styles.Text}>REDIWALA</Text>
    </View>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#343a40',
  },
  Text: {
    color: 'white',
    paddingTop: 10,
    paddingRight: 30,
  },
});

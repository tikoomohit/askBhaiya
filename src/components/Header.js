import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Card from '../components/Card';

const Header = (props) => {
  return <Text>{props.label}</Text>;
};

export default Header;

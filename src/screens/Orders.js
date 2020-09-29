import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Orders = () => {
  return (
    <View style={Styles.Container}>
      <Text>0 Orders waiting</Text>
    </View>
  );
};

export default Orders;

const Styles = StyleSheet.create({
  Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

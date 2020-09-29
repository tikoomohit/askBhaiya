import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <View style={Styles.Container}>
      <Header label="Available Items" />
      <View style={Styles.Grid}>
        <Card>
          <Text>Fruits</Text>
        </Card>
        <Card>
          <Text>Vegetables</Text>
        </Card>
        <Card>
          <Text>Water</Text>
        </Card>
        <Card>
          <Text>Pick and Drop</Text>
        </Card>
      </View>
      <Text>+ Start adding your cart items</Text>
    </View>
  );
};

export default Home;

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  Grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 150,
    height: 120,
  },
});

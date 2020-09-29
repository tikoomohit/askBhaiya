import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.Card}>
      <View style={styles.CardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    borderColor: '#ddd',
    marginHorizontal: 28,
    marginVertical: 5,
    //flex: '1 1 0',
    //flexBasis: '100%',
    height: 80,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#00FFA4',
  },
  CardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});

export default Card;

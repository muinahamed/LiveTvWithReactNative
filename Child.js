import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Child = ({item}) => {
  return (
    <View
      style={{
        height: 100,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'gray',
        padding: 10,
      }}>
      <Text>{item?.name}</Text>
      <Text>{item?.url}</Text>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({});

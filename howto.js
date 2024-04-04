import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HowToUseApp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How to Use the App</Text>
      <Text style={styles.text}>
       instructions here
      </Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default HowToUseApp;

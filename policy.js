import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PolicyGuidelines = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Policy Guidelines</Text>
      <Text style={styles.text}>
      
      policy guidelines here...

      
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

export default PolicyGuidelines;

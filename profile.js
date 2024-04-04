import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileSettings = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [residence, setResidence] = useState('');
  const [gender, setGender] = useState('');

  const saveProfile = () => {

    console.log("Age:", age);
    console.log("Residence:", residence);
    console.log("Gender:", gender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Place of Residence"
        value={residence}
        onChangeText={setResidence}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Save" onPress={saveProfile} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default ProfileSettings;

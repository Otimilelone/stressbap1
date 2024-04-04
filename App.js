import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList,TextInput, StyleSheet, TouchableOpacity, Modal, Alert, Switch, PermissionsAndroid } from 'react-native';
import {onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,} from 'firebase/auth';
import { auth } from './firebase';
import Icon from '@expo/vector-icons/AntDesign';
import call from 'react-native-phone-call';
import Geolocation from 'react-native-geolocation-service';




/*components defined in sceebs before , now defined within the loggedin component */
function LoggedIn() {
const Emergency = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [relationship, setRelationship] = useState('');
    const [email, setEmail] = useState('');
    const [emergencyContacts, setEmergencyContacts] = useState([]);
  
    const addEmergencyContact = () => {
      if (fullName && phoneNumber && relationship && email) {
        const newContact = {
          id: Math.random().toString(),
          fullName,
          phoneNumber,
          relationship,
          email
        };
        setEmergencyContacts(prevContacts => [...prevContacts, newContact]);
        setFullName('');
        setPhoneNumber('');
        setRelationship('');
        setEmail('');
      }
    };
  
    const renderEmergencyContact = ({ item }) => (
      <View style={styles.contactItem}>
        <Text style={styles.contactText}>{item.fullName}</Text>
        <Text style={styles.contactText}>{item.phoneNumber}</Text>
        <Text style={styles.contactText}>{item.relationship}</Text>
        <Text style={styles.contactText}>{item.email}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Emergency Contacts</Text>
  
        <FlatList
          data={emergencyContacts}
          renderItem={renderEmergencyContact}
          keyExtractor={item => item.id}
        />
  
        <Text style={styles.subHeading}>Add Emergency Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Relationship"
          value={relationship}
          onChangeText={text => setRelationship(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEmergencyContact}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const[showEmergency,setEmergency] = useState(false);
  const[showContacts,setContacts] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relationship, setRelationship] = useState('');
  const [email, setEmail] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const renderEmergencyContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>{item.fullName}</Text>
      <Text style={styles.contactText}>{item.phoneNumber}</Text>
      <Text style={styles.contactText}>{item.relationship}</Text>
      <Text style={styles.contactText}>{item.email}</Text>
    </View>
  );
  const addEmergencyContact = () => {
    if (fullName && phoneNumber && relationship && email) {
      const newContact = {
        id: Math.random().toString(),
        fullName,
        phoneNumber,
        relationship,
        email
      };
      setEmergencyContacts(prevContacts => [...prevContacts, newContact]);
      setFullName('');
      setPhoneNumber('');
      setRelationship('');
      setEmail('');
    }
  };
  //const [setContacts, Contacts] = useState("")
  //const Contacts = () => {
    const handleDial = (phoneNumber) => {
      const callUrl = `tel:+${encodeURIComponent(phoneNumber)}`;
  
      const args = {
        number: callUrl,
        prompt: true,
      };
  
      // Make a call
      call(args).catch(console.error);
  
      console.log(`Dialing ${phoneNumber}`);
    };//}
  
  // const handleDial = (phoneNumber) => {
  
  //   const args = {
  //       number: phoneNumber,
  //       prompt: true,
  //     };
  
  //     // Make a call
  //     call(args).catch(console.error);
  
  //     console.log(`Dialing ${phoneNumber}`);
  //   };
  //     const args = {
  //     number: phoneNumber,
  //     prompt: true,
  //   };

  //geo
      // Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const [location, setLocation] = useState(false);

const getLocation = () => {
  const result = requestLocationPermission();
  result.then(res => {
    console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
  console.log(location);
};


    

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


      
      <TouchableOpacity style={styles.user} onPress={() => setEmergency(true)} >
      <Icon name="user" color="#00716F" size={30}/>       
        {/* <Text style={styles.buttonText}>Panic Button</Text> */}
      </TouchableOpacity>
       
       

      <Modal visible={showEmergency} animationType="slide">
        <View style={styles.container}>
         
        <View style={styles.container}>
      <Text style={styles.heading}>Emergency Contacts</Text>

      <FlatList
        data={emergencyContacts}
        renderItem={renderEmergencyContact}
        keyExtractor={item => item.id}
      />

      <Text style={styles.subHeading}>Add Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={relationship}
        onChangeText={text => setRelationship(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addEmergencyContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>

          <Button title="Close" onPress={() => setEmergency(false)} />
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => alert("Suspicious Activity Reported!")} onLongPress={() => alert("Distress Alert sent!")}>
        <Text style={styles.buttonText}>Panic Button</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => setContacts(true)} onLongPress={() => alert("Second Circle Button Long Pressed!")}>
        <Text style={styles.buttonText}>Emergency Call</Text>
      </TouchableOpacity>

      <Modal visible={showContacts} animationType="slide">
        <View style={styles.container}>
        <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => handleDial("+267999")}>
        <Text style={styles.boxText}>Police Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handleDial("998")}>
        <Text style={styles.boxText}>Emergency Medical Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handleDial("997")}>
        <Text style={styles.boxText}>Fire Department</Text>
      </TouchableOpacity>
    </View>
          <Button title="Close" onPress={() => setContacts(false)} />
        </View>
      </Modal>        
    </View>

    
  );

};



  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

/*panic  button*/
   const Trigger = ({ navigation }) => {
     return (
       <View style={styles.triggerContainer}>
         <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('Emergency')}>
           <Icon name="user" color="#00716F" size={30} />
           <Text style={styles.buttonText}>Panic Button</Text>
         </TouchableOpacity>
  
         <TouchableOpacity style={styles.button} onPress={() => alert("Suspicious Activity Reported!")} onLongPress={() => alert("Distress Alert sent!")}>
           <Text style={styles.buttonText}>Panic Button</Text>
         </TouchableOpacity>
  
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contacts')} onLongPress={getLocation}>
           <Text style={styles.buttonText}>Emergency Call</Text>
         </TouchableOpacity>
       </View>
     );
   };




/** ema ha */

function Signup({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('There was a problem creating your account');
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
      <Image
        source={require('./src/images/AYS.jpg')}
         style={{ width: '100%', height: '20%' }}
        />
        <Text style={styles.header}>Signup</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.link}>Already A Member</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button 
          title="Create Account"
          onPress={createAccount}
          disabled={!email || !password || !confirmPassword}

        />
      </View>
    </View>
  );
}

function Login({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
     
        <Image
        source={require('./src/images/AYS.jpg')}
         style={{ width: '100%', height: '20%' }}
        />

        <Text style={styles.header}>YOUR PERSONAL SAFETY COMPANION</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen('signup')}>
          <Text style={styles.link}>New Member</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => setScreen('reset-password')}>
          <Text style={[styles.link, { color: '#333' }]}>I've forgotten my password</Text>
        </TouchableOpacity>

        <Button title="Login" onPress={loginUser} disabled={!email || !password} />
      </View>
    </View>
  );
}

function ResetPassword({ setScreen }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
      setError(null);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Reset Password</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>

        {submitted ? (
          <Text>Please check your email for a reset password link.</Text>
        ) : (
          <>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />

            <Button title="Reset Password" onPress={resetUserPassword} disabled={!email} />
          </>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn />;
    if (screen === 'signup') return <Signup setScreen={setScreen} />;
    if (screen === 'reset-password') return <ResetPassword setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  return <View style={{ flex: 1 }}>{getScreen()}</View>;
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 13.5,
    fontWeight: '900',
    marginBottom: 20,
    width: 900,
  },
  input: {
    borderWidth: 2.5,
    borderColor: '#00716F',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
  link: {
    color: '#00716F',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#00716F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  box: {
    width: 200,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#00716F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#00716F",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },

  user: {
  alignSelf: "flex-end",
  },
});
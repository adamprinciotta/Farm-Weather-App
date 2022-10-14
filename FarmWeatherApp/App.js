import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import React, { Component } from 'react';
import * as React from 'react';
import {
  Button,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';
import GPSPos from './src/GPS'

function HomeScreen({ navigation }) {
  return (
    <View style={{
      flex: 1,
      flexDirection:'column',
      backgroundColor:"#827459",
      
    }}>
      <GPSPos isMainPage={true} />

      <View style={styles.buttonContainer}>
      <TouchableOpacity
         style = {styles.button}
         onPress={() => navigation.navigate('Suggestions')}
       >
         <Text style = {styles.buttonText}> Garden Suggestions </Text>
       </TouchableOpacity>
      </View>
    </View>
  );
}

function Suggestions({ navigation }) {
  return (
    <GPSPos isMainPage={false} />
  );
}


const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Suggestions" component={Suggestions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  buttonContainer : {
    borderRadius: 10,
    marginVertical: -20,
    marginHorizontal: 10,
  },
  button : {
    alignItems: 'center',
    backgroundColor: '#413735',
    padding: 10,
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import Attendance from './src/screens/Attendance';

const App=()=> {

  return (
    <SafeAreaView style={styles.root}>
      <Attendance />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   root:{
    flex:1,
    backgroundColor:'#F9FBFC',
   }
});

export default App;
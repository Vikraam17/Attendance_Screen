import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const HamburgerButton = () => {
  const handlePress = () => {
    Alert.alert("Hamburger Button Clicked!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.hamburgerButton}>
        <Text style={styles.hamburgerText}>≡</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  hamburgerButton: {
    paddingRight:10,
    borderRadius: 5,
  },
  hamburgerText: {
    fontSize: 40,
  },
});

export default HamburgerButton;

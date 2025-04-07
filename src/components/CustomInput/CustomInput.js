import React from 'react'
import { Text, View, TextInput, StyleSheet, } from 'react-native'

const CustomInput = ({value, setValue, Placeholder, secureTextEntry}) => {
    return (
      <View style={styles.container}>
        <TextInput 
        style={styles.input}
        placeholder={Placeholder} 
        placeholderTextColor="grey"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width:'100%',

    borderColor:'#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical:5,
  },
  input:{
    color:'black',
  },
});

export default CustomInput;

import React from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/Group_45.png'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useState } from 'react';

const SignInScreen =()=> {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const {height}=useWindowDimensions();

  const onSignInPressed =()=>{
    console.warn('Log In');
  }

  const onForgotPasswordPressed=()=>{
    console.warn('Forgot Password');
  }

    return (
      <View style={styles.root}>
        <Image source={Logo} 
        style={[styles.logo, {height: height * 0.3}]} resizeMode='contain'/>

        <CustomInput 
        Placeholder="User Name" 
        value={Username} 
        setValue={setUsername}/>

        <CustomInput 
        Placeholder="Password" 
        value={Password} 
        setValue={setPassword} 
        secureTextEntry={true}/>

        <CustomButton text="Log In" onPress={onSignInPressed}/>

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>

      </View>
    )
};
 const styles= StyleSheet.create({
  root:{
    alignItems:'center',
    padding:40,
  },
  logo:{   
    width:'70%',
    maxWidth:300,
    height:100,
  },
 });

export default SignInScreen

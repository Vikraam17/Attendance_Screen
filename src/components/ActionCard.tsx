import { StyleSheet, Text, View, Linking, TouchableOpacity,Alert, ScrollView } from 'react-native'
import React from 'react'

export default function ActionCard() {
  function openWebsite(websiteLink: string){
    Linking.openURL(websiteLink)
  }
  const handlePress = () => {
    Alert.alert("Accepted");
  };
  return (
    <ScrollView>
      <View style={[styles.card, styles.cardOne, styles.cardElevated]}>
        <Text style={styles.textElement}>Name   : </Text>
        <Text style={styles.textElement}>Time Slot : </Text>
        <Text style={styles.textElement}>Paid</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.cardTwo, styles.cardElevated]}>
      <Text style={styles.textElement}>Name   : </Text>
        <Text style={styles.textElement}>Time Slot : </Text>
        <Text style={styles.textElement}>Pending $1000</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  card:{
    flex:1,
    height:150,
    width:370,
    padding:10,
    margin:6,
    marginHorizontal:20,
    borderRadius:6,
  },
  cardElevated:{},
  cardOne:{
    backgroundColor:'green',
    elevation:0.4,
  },
  cardTwo:{
    backgroundColor:'red',
  },
  textElement:{
    fontSize:18,
    fontWeight:'bold',
    color:'white',
  },
  button:{
    backgroundColor:'#FFF',
    alignItems:'center',
    borderRadius:5,
    marginHorizontal:90,
    marginVertical:20,
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold',
    color:'black',
  }
})

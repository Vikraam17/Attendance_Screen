import { ScrollView, StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native'
import React from 'react'

export default function ContactList() {
  const contacts=[
    {
      Uid:1,
      Name:'Vikraam',
      TimeSlot:1,
      Status:'Paid',
    },
    {
      Uid:2,
      Name:'Vino',
      TimeSlot:2,
      Status:'Pending',
      Amount:1000,
    },
    {
      Uid:3,
      Name:'Raja',
      TimeSlot:1,
      Status:'Paid',
    },
  ]

  const handlePress = () => {
    Alert.alert("Hamburger Button Clicked!");
  };
  return (
    <View>

      <ScrollView style={styles.container} scrollEnabled={false}>
        {contacts.map(({Uid, Name, TimeSlot, Status,Amount})=>(
          <View key={Uid} style={[styles.userCard, styles.color] }>
            <Text style={[styles.user, styles.userName]}>Name : {Name}</Text>
            <Text style={[styles.user, styles.userTimeslot]}>Time Slot : {TimeSlot}</Text>
            <Text style={[styles.user, styles.userStatus]}>{Status} {Amount}</Text>

            <TouchableOpacity onPress={handlePress} style={styles.button}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:6,
  },
  userCard:{
    height:120,
    width:300,
    margin:10,
    borderRadius:6,
    marginHorizontal:20,
  },
  color:{
    backgroundColor:'red',
  },
  color1:{
    backgroundColor:'green',
  },
  user:{
    marginHorizontal:10,
    fontWeight:'bold',
    color:'white',
  },
  userName:{
    fontSize:24,
  },
  userTimeslot:{
    fontSize:20,
  },
  userStatus:{
    fontSize:16,
  },
  button:{
    borderRadius:10,
    alignItems:'center',
    backgroundColor:'#fff',
    marginHorizontal:90,
    padding:2
  },
  buttonText:{
    fontSize:16,
    fontWeight:'bold'
  },
})
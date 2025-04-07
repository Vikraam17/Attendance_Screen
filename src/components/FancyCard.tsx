import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FancyCard() {
  return (
    <View>
      <Text style={styles.headingText}>Treanding Places</Text>
        <View style={[styles.card, styles.cardElevated]}>
          <Image source={{uri:'https://i0.wp.com/gangautsav.in/wp-content/uploads/2024/03/diwali-dates.webp?resize=1792%2C1024&ssl=1'}} style={styles.cardImage}/>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Diwali</Text>
            <Text style={styles.cardLabel}>India, Tamil Nadu</Text>
            <Text style={styles.cardDescription}>Southern India celebrates it as the day that Lord Krishna defeated the demon Narakasura. In western India the festival marks the day that Lord Vishnu, the Preserver sent the demon King Bali to rule the nether world.</Text>
            <Text style={styles.cardFooter}>38 days away</Text>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headingText:{
    fontSize:24,
    fontWeight:'bold',
    paddingHorizontal:8
  },
  card:{
    width:340,
    height:380,
    borderRadius:6,
    marginHorizontal:12,
    marginVertical:16,
    
  },
  cardElevated:{
    backgroundColor:'#FFFFFF',
    color:'#000000',
    elevation:3,
    shadowOffset:{
      width:1,
      height:1,
    },
  },
  cardImage:{
    height:180,
    marginBottom:8,
    borderTopLeftRadius:6,
    borderTopRightRadius:6,

  },
  cardBody:{
    flex:1,
    flexGrow:1,
    paddingHorizontal:12,
    
  },
  cardTitle:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:4,
    color:'#000000',
  },
  cardLabel:{
    fontSize:16,
    marginBottom:6,
    color:'#000000',
  },
  cardDescription:{
    fontSize:14,
    marginBottom:12,
    marginTop:6,
    flexShrink:6,
    color:'#242B2E',
  },
  cardFooter:{
    fontSize:12,
    color:'#000000',
  },
})
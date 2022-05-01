import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import Logo from './assets/images/logo.png';
import * as React from 'react';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { Dimensions, Platform } from 'react-native';
import Reacts, { useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Nav() {

  const[place, setPlaceDetails] = React.useState({
    icon: "",
    address: "",
    //state: "",
    //zip: "",
    //country: "",
  })

  const[pin, setPin] = React.useState ({
    latitude: 37.78825,
    longitude: -122.4324,
    
  })
  const[region, setRegion] = React.useState ({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

  })

  return (
    <View style={{marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails = {true}
        GooglePlacesSearchQuery = {{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        setPlaceDetails({
          icon: details.icon,
          address: details.adr_address,
          //state: "",
          //zip: "",
          //country: "",
        })
        console.log(place.icon)
      }}
      query={{
        key: 'AIzaSyBqzNuTcmVCk6UbQ9lAjTZU89eAAOoury4',
        language: 'en',
        components: "country:us",
        types: 'restaurant',
        radius: 30,
        location: `${region.latitude}, ${region.longitude}`
      }}
      styles={{
        container: {flex: 0, position: "absolute", width: "100%", zIndex: 1},
        listView:{backgroundColor: "white"}
      }}
    />


      <MapView 
      style={styles.map}
      initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }} 
      provider="google"
      >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        <Marker 
        coordinate={pin}
        pinColor="green"
        draggable={true}
        onDragStart={(e) => {
        console.log("Lat of old location", e.nativeEvent.coordinate.latitude)
        console.log("Lon of old location", e.nativeEvent.coordinate.longitude)
      }}
      onDragEnd={(e) => {
        setPin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
          //Put weather function here
        })
        setRegion({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
        })
        console.log("Lat of new location", e.nativeEvent.coordinate.latitude)
        console.log("Lon of new location", e.nativeEvent.coordinate.longitude)
      }}
      >
       
        <Callout>
          <Text>You are here</Text>
        </Callout> 
      </Marker>
      <Circle center={pin} 
      radius={3000} />
      </MapView>

      
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center'
  }
});
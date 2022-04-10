import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './assets/images/logo.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, {Component} from 'react'
import { render } from 'react-dom';

let WeatherState = {
  isLoading: true,
  temperature: 0,
  weatherCondition: null,
  error: null
};

let State = {
  location: null,
  geocode: null,
  errorMessage: ""
};

const API_KEY = 'e850b2da0cbbe5f12183c48286bfee3c';

getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
  let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
  const { latitude , longitude } = location.coords;
  getGeocodeAsync({latitude, longitude})
  State.location = {latitude, longitude};
  return true;
};

getGeocodeAsync = async (location) => {
  let geocode = await Location.reverseGeocodeAsync(location);
  State.geocode = geocode;
}

async function fetchWeatherAsync(){
  let didLocationRun = await getLocationAsync ();
  let lat = State.location.latitude;
  let lon = State.location.longitude;
  //console.log("\nFETCHING THE WEATHER:\nState OBJ: \n", State, "\nLocation OBJ: \n", State.location, "\nlat and lon: \n", lat, lon);
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
      console.log("\nJSON: \n", json);
      WeatherState['temperature'] = json.main.temp,
      WeatherState['weatherCondition'] = json.weather[0].main, 
      WeatherState['isLoading'] = false})
      //rerender();
      return true;
}

let didWeatherRun = fetchWeatherAsync();


export default function App() {

  let placement = State.location;
  let geocode = State.geocode;
  console.log("\nFIRST CALL\n State OBJ: \n", State, "\nPlacement OBJ: \n", placement, "\nWeather OBJ: \n", WeatherState);
  return (
    
    <View style={styles.container}>  
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 40}}>Explore</Text>
      </View>
      <ScrollView>
      
      {/* Food Section */}
      <View style={styles.foodElement}>
        <View style={styles.food}>
          <Text style={{fontSize: 20}}>Restaurant</Text>
          <Image source={Logo} style={{height: 90, width: 90, borderRadius: 400/2}} />
        </View>
        <View style={styles.food}>
        <Text style={{fontSize: 20}}>Restaurant</Text>
          <Image source={Logo} style={{height: 90, width: 90, borderRadius: 400/2}} />
        </View>
        <View style={styles.food}>
        <Text style={{fontSize: 20}}>Restaurant</Text>
          <Image source={Logo} style={{height: 90, width: 90, borderRadius: 400/2}} />
        </View>
      </View>

      {/* Weather Section */}
      {/* WE DO NOT HAVE THE FORECAST, STILL MUST GET */}
      <View style={styles.weatherBox}> 
      <Text style={styles.weatherWord}>Weather</Text>
        <ScrollView style={styles.weathersWeatherBox} horizontal={true}>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Today</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Tomorrow</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Two days from now</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Three days from now</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Four days from now</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Five days from now</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition}</Text>
              <Text>Six days from now</Text>
              <Text>{WeatherState.temperature} C</Text>
            </View>
          </View>

        </ScrollView>
      </View>

      {/* News Section */}
      <View style={styles.newsTitleAndBox}>
      <Text style={{fontSize: 20}}>📰 News 📰</Text>
      <View style={styles.newsContainer}>
        <View style={styles.newsItem}>
          <Text style={{fontSize: 40}}>📰</Text>
          <Text>Article 1</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>
        <View style={styles.newsItem}>
          <Text style={{fontSize: 40}}>📰</Text>
          <Text>Article 2</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>
        <View style={styles.newsItem}>
          <Text style={{fontSize: 40}}>📰</Text>
          <Text>Article 3</Text> 
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>
      </View>

      
      </View>
      {/* Instagram Section */}
      <View style={styles.instaContainer}>
      <Text style={{fontSize: 20}}>📷 Instagram Photos 📷</Text>
        <View style={styles.row}>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
          <View style={styles.explorePhotos}>
            <Image source={Logo} style={{height: 80, width: 80}} />
          </View>
        </View>
          
          

          
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7d6ab',
  },
  titleContainer: {
    fontSize: 28,
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodElement: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ccc',
    borderRadius: 20,
    flexDirection: 'row',
  },
  food: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherBox: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'column',
    
  },

  weathersWeatherBox: {
    flexDirection: 'row',
    paddingTop: 10,
    

  },
  weatherItem: {
    backgroundColor: '#5ebf64',
    padding: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 30,
    
  },

  weatherWord: {
    color: '#00fa81',
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: '#a0c791',
    padding: 10,
  },

  weatherEmoji: {
    fontSize: 20,
  },

  weatherSpacing: {
    paddingHorizontal: 10,
  },

  instaContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'lightblue',
    justifyContent: "space-evenly",
    alignItems: 'center',
  },

  explorePhotos: {
    justifyContent: "center",
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    height: 80,
  },

  row: {
    flexDirection: 'row',
  },

  newsTitleAndBox: {
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 60,
    padding: 10,
  },

  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  newsItem: {
    padding: 20,
    flex: 1,
  },
});

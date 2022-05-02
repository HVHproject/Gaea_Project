import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './assets/images/logo.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, {Component} from 'react'
import { render } from 'react-dom';

let WeatherState = {
  isLoading: true,
  temperature0: 0,
  temperature1: 0,
  temperature2: 0,
  temperature3: 0,
  temperature4: 0,
  temperature5: 0,
  temperature6: 0,
  time0: null,
  time1: null,
  time2: null,
  time3: null,
  time4: null,
  time5: null,
  time6: null,
  weatherCondition0: null,
  weatherCondition1: null,
  weatherCondition2: null,
  weatherCondition3: null,
  weatherCondition4: null,
  weatherCondition5: null,
  weatherCondition6: null,
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
  fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
      //console.log("\nJSON: \n", json);
      // console.log("\n\n\nHello, here is some data:");
      // console.log("\n\nDate(json.daily[0].dt*1000).toLocaleString()\n", new Date(json.daily[0].dt*1000).toLocaleString());
      // console.log("\n\nDate(json.daily[1].dt*1000).toLocaleString()\n", new Date(json.daily[1].dt*1000).toLocaleString());
      // console.log("\n\njson.daily[0].temp.day\n", json.daily[0].temp.day);
      // json.weather[0].main,
      //Day 0 fetch
      WeatherState['temperature0'] = json.current.temp
      WeatherState['time0'] = new Date(json.daily[0].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition0'] = json.current.weather[0].main,
      //Day 1 fetch
      WeatherState['temperature1'] = json.daily[1].temp.day,
      WeatherState['time1'] = new Date(json.daily[1].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition1'] = json.daily[1].weather[0].main,
      //Day 2 fetch
      WeatherState['temperature2'] = json.daily[2].temp.day,
      WeatherState['time2'] = new Date(json.daily[2].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition2'] = json.daily[2].weather[0].main,
      //Day 3 fetch
      WeatherState['temperature3'] = json.daily[3].temp.day,
      WeatherState['time3'] = new Date(json.daily[3].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition3'] = json.daily[3].weather[0].main,
      //Day 4 fetch
      WeatherState['temperature4'] = json.daily[4].temp.day,
      WeatherState['time4'] = new Date(json.daily[4].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition4'] = json.daily[4].weather[0].main,
      //Day 5 fetch
      WeatherState['temperature5'] = json.daily[5].temp.day,
      WeatherState['time5'] = new Date(json.daily[5].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition5'] = json.daily[5].weather[0].main,
      //Day 6 fetch
      WeatherState['temperature6'] = json.daily[6].temp.day,
      WeatherState['time6'] = new Date(json.daily[6].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition6'] = json.daily[6].weather[0].main,

      WeatherState['isLoading'] = false})
      return true;
}

function fetchWeather(lat, lon){
  //console.log("\nFETCHING THE WEATHER:\nState OBJ: \n", State, "\nLocation OBJ: \n", State.location, "\nlat and lon: \n", lat, lon);
  fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
      //Day 0 fetch
      WeatherState['temperature0'] = json.current.temp
      WeatherState['time0'] = new Date(json.daily[0].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition0'] = json.current.weather[0].main,
      //Day 1 fetch
      WeatherState['temperature1'] = json.daily[1].temp.day,
      WeatherState['time1'] = new Date(json.daily[1].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition1'] = json.daily[1].weather[0].main,
      //Day 2 fetch
      WeatherState['temperature2'] = json.daily[2].temp.day,
      WeatherState['time2'] = new Date(json.daily[2].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition2'] = json.daily[2].weather[0].main,
      //Day 3 fetch
      WeatherState['temperature3'] = json.daily[3].temp.day,
      WeatherState['time3'] = new Date(json.daily[3].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition3'] = json.daily[3].weather[0].main,
      //Day 4 fetch
      WeatherState['temperature4'] = json.daily[4].temp.day,
      WeatherState['time4'] = new Date(json.daily[4].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition4'] = json.daily[4].weather[0].main,
      //Day 5 fetch
      WeatherState['temperature5'] = json.daily[5].temp.day,
      WeatherState['time5'] = new Date(json.daily[5].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition5'] = json.daily[5].weather[0].main,
      //Day 6 fetch
      WeatherState['temperature6'] = json.daily[6].temp.day,
      WeatherState['time6'] = new Date(json.daily[6].dt*1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}),
      WeatherState['weatherCondition6'] = json.daily[6].weather[0].main,

      WeatherState['isLoading'] = false})
      return true;
}

let didWeatherRun = fetchWeatherAsync();

export default function App() {

  let placement = State.location;
  let geocode = State.geocode;
  //console.log("\nFIRST CALL\n State OBJ: \n", State, "\nPlacement OBJ: \n", placement, "\nWeather OBJ: \n", WeatherState);
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
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition0}</Text>
              <Text>{WeatherState.time0}</Text>
              <Text>{WeatherState.temperature0} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition1}</Text>
              <Text>{WeatherState.time1}</Text>
              <Text>{WeatherState.temperature1} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition2}</Text>
              <Text>{WeatherState.time2}</Text>
              <Text>{WeatherState.temperature2} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition3}</Text>
              <Text>{WeatherState.time3}</Text>
              <Text>{WeatherState.temperature3} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition4}</Text>
              <Text>{WeatherState.time4}</Text>
              <Text>{WeatherState.temperature4} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition5}</Text>
              <Text>{WeatherState.time5}</Text>
              <Text>{WeatherState.temperature5} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{WeatherState.weatherCondition6}</Text>
              <Text>{WeatherState.time6}</Text>
              <Text>{WeatherState.temperature6} C</Text>
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

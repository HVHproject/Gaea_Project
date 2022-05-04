import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Linking, Button } from 'react-native';
import Logo from './assets/images/logo.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, {Component} from 'react'
import { render } from 'react-dom';
import openMap from 'react-native-open-maps';



const API_KEY = 'weatherApiKeyHere';
const GOOGLE_KEY = 'googleApiKeyHere';


class park {
  constructor(name, photoref, htlmlatt, coords) {
    this.name = name;
    this.photoref = photoref;
    this.htlmlatt = htlmlatt;
    this.coords = coords;
  }
}

class food{
  constructor(name, photoref, htlmlatt, rating, coords) {
    this.name = name;
    this.photoref = photoref;
    this.htlmlatt = htlmlatt;
    this.rating = rating;
    this.coords = coords;
  }
}

class weather{
  contructor(temp,time,condition,emoji){
    this.temp = temp;
    this.time = time;
    this.condition = condition;
    this.emoji = emoji;
  }
}

let photoSize =
{
  foodPhotoMaxHeight: 160,
  foodPhotoMaxWidth: 160,
}


let parkStates = {
  parks: [new park(), new park(), new park()]
}

let foodStates = {
  foods: [new food(), new food(), new food()]
}

let weatherStates = {
  weathers: [new weather(), new weather(), new weather(), new weather(), new weather(), new weather(), new weather()],
  isLoading: true,
}


let State = {
  location: null,
  geocode: null,
  errorMessage: ""
};


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

async function fetchGooglePlaces(){
  let didLocationRun = await getLocationAsync ();
  let lat = State.location.latitude;
  let lon = State.location.longitude;
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=2000&type=restaurant&key=${GOOGLE_KEY}`).then(res => res.json()).then(json => {
    //console.log("\nJSON: \n", json);
    //Grab top 3 results names
    let i = 0;

    while(i < 3)
    {
      let currentFood = new food(json.results[i].name,
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + photoSize.foodPhotoMaxWidth + "&photo_reference=" + json.results[i].photos[0].photo_reference + "&key=" + GOOGLE_KEY,
          json.results[i].photos[0].html_attributions,
          json.results[i].rating,
          json.results[i].geometry.location)
        foodStates[i] = currentFood;
        //console.log("\nFood State: \n", foodStates[i]);
        i = i + 1;
      }
  })
  return true
} 
{/*
async function fetchGoogleParks() {
  let didLocationRun = await getLocationAsync ();
  let lat = State.location.latitude;
  let lon = State.location.longitude;
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=5000&type=park&key=${GOOGLE_KEY}`).then(res => res.json()).then(json => {
    //console.log("\n PARK JSON: \n", json);
    let i = 0;
    while(i < 3){
      let currentPark = new park(json.results[i].name, 
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + photoSize.foodPhotoMaxWidth + "&photo_reference=" + json.results[i].photos[0].photo_reference + "&key=" + GOOGLE_KEY,
        json.results[i].photos[0].html_attributions,
        json.results[i].geometry.location)
      parkStates.parks[i] = currentPark
      i = i + 1
    }
  })
  //console.log("Park Data ", parkStates)
  return true

}
*/}

async function fetchWeatherAsync(){
  let didLocationRun = await getLocationAsync ();
  let lat = State.location.latitude;
  let lon = State.location.longitude;
  //console.log("\nFETCHING THE WEATHER:\nState OBJ: \n", State, "\nLocation OBJ: \n", State.location, "\nlat and lon: \n", lat, lon);
  fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
      //console.log("\nJSON: \n", json);
      // json.weather[0].main,
      let i = 0;
      while(i < 7)
      {
        let currentTemp = null;
        let currentTime = new Date(json.daily[i].dt*1000).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'});
        let currentCondition = null;
        if(i == 0)
        {
          currentTemp = json.current.temp;
          currentCondition = json.current.weather[0].main;
        }
        else{
          currentTemp = json.daily[i].temp.day;
          currentCondition = json.daily[i].weather[0].main;
        }
        let currentWeather = new weather(currentTemp, currentTime, currentCondition, "☁️")
        weatherStates[i] = currentWeather;

        i = i + 1;
      }
      weatherStates.isLoading = false})
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
      //return true;
}

function goToMap(lat, lon){
  openMap({lat, lon});
}


let didWeatherRun = fetchWeatherAsync();
let didGoogleRun = fetchGooglePlaces();
//let didParksRun = fetchGoogleParks();



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
      <View style={styles.foodBox}> 
      <Text style={styles.foodWord}>Restaurants</Text>
        <ScrollView style={styles.foodsFoodBox} horizontal={true}>
          
          
          <View style={styles.foodSpacing}>
            <View style={styles.foodItem}>
              <Image source={{uri: foodStates.foods[0].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
              <Text>{foodStates.foods[0].name}</Text>
              <Text>{foodStates.foods[0].rating} ⭐</Text>
              <Text style={{fontSize: 10}} onPress={() => Linking.openURL(foodStates.foods[0].htmlatt)}>Photo credit</Text>
            </View>
          </View>
          <View style={styles.foodSpacing}>
            <View style={styles.foodItem}>
            <Image source={{uri: foodStates.foods[1].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
              <Text>{foodStates.foods[1].name}</Text>
              <Text>{foodStates.foods[1].rating} ⭐</Text>
              <Text style={{fontSize: 10}} onPress={() => Linking.openURL(foodStates.foods[1].htmlatt)}>Photo credit</Text>
            </View>
          </View>
          <View style={styles.foodSpacing}>
            <View style={styles.foodItem}>
            <Image source={{uri: foodStates.foods[2].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
              <Text>{foodStates.foods[2].name}</Text>
              <Text>{foodStates.foods[2].rating} ⭐</Text>
              <Text style={{fontSize: 10}} onPress={() => Linking.openURL(foodStates.foods[2].htmlatt)}>Photo credit</Text>
            </View>
          </View>
          
        </ScrollView>
      </View>
      

      {/* Weather Section */}
      {/* WE DO NOT HAVE THE FORECAST, STILL MUST GET */}
      <View style={styles.weatherBox}> 
      <Text style={styles.weatherWord}>Weather</Text>
        <ScrollView style={styles.weathersWeatherBox} horizontal={true}>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[0].condition}</Text>
              <Text>{weatherStates.weathers[0].time}</Text>
              <Text>{weatherStates.weathers[0].temp} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[1].condition}</Text>
              <Text>{weatherStates.weathers[1].time}</Text>
              <Text>{weatherStates.weathers[1].temp} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[2].condition}</Text>
              <Text>{weatherStates.weathers[2].time}</Text>
              <Text>{weatherStates.weathers[2].temp} C</Text>
            </View>
          </View>

          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[3].condition}</Text>
              <Text>{weatherStates.weathers[3].time}</Text>
              <Text>{weatherStates.weathers[3].temp} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[4].condition}</Text>
              <Text>{weatherStates.weathers[4].time}</Text>
              <Text>{weatherStates.weathers[4].temp} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[5].condition}</Text>
              <Text>{weatherStates.weathers[5].time}</Text>
              <Text>{weatherStates.weathers[5].temp} C</Text>
            </View>
          </View>
          
          <View style={styles.weatherSpacing}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherEmoji}>{weatherStates.weathers[6].condition}</Text>
              <Text>{weatherStates.weathers[6].time}</Text>
              <Text>{weatherStates.weathers[6].temp} C</Text>
            </View>
          </View>

        </ScrollView>
      </View>

      {/* Instagram Section */}
      <View style={styles.instaContainer}>
      <Text style={{fontSize: 20}}>📷 Instagram Photos 📷</Text>
        <Text>{parkStates.parks[0].name}</Text>
        <View style={styles.explorePhotos}>
          <Image source={{uri: parkStates.parks[0].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
        </View>
        <Text>{parkStates.parks[1].name}</Text>
        <View style={styles.explorePhotos}>
        <Image source={{uri: parkStates.parks[1].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
        </View>
        <Text>{parkStates.parks[2].name}</Text>
        <View style={styles.explorePhotos}>
        <Image source={{uri: parkStates.parks[2].photoref}} style={{height: 160, width: 160, paddingTop: 0, borderRadius: 20,}} />
        </View>

        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7d6ab',
  },
  titleContainer: {
    fontSize: 28,
    backgroundColor: '#eee',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodBox:{
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
  },
  foodWord:{
    color: '#212529',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#ADB5BD',
    padding: 10,
    borderRadius: 20,
  },
  foodsFoodBox:{
    flexDirection: 'row',
    paddingTop: 10,
  },
  foodSpacing:{
    paddingHorizontal: 5,
  },

  foodItem:{
    backgroundColor: '#CED4DA',
    //padding: 10,
    //paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 30,
    width: 160, 
    height: 220,
    justifyContent: 'space-evenly',
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
    width: 120,
    height: 120,
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

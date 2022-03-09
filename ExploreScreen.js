import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './assets/images/logo.png';
import Geolocation from 'react-native-geolocation-service';


export default function App() {
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
      <View style={styles.weatherBox}> 
      <Text style={{fontSize: 20}}>Weather</Text>
        <View style={styles.weathersWeatherBox}>
          <View style={styles.weatherItem}>
            <Text style={{fontSize: 40}}>☁️</Text>
            <Text>Today</Text>
            <Text>Temp</Text>
          </View>
          <View style={styles.weatherItem}>
          <Text style={{fontSize: 40}}>🌨️</Text>
            <Text>Tomorrow</Text>
            <Text>Temp</Text>
          </View>
          <View style={styles.weatherItem}>
          <Text style={{fontSize: 40}}>🌤️</Text>
            <Text>Tomorrow + 1</Text>
            <Text>Temp</Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ddd',
    borderRadius: 20,
    flexDirection: 'column',
  },
  weathersWeatherBox: {
    flexDirection: 'row',
    
  },
  weatherItem: {
    backgroundColor: '#ccc',
    borderRadius: 60,
    padding: 20,
    alignItems: 'center',
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

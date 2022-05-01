import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import Logo from './assets/images/logo.png';


const HomeScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      
      <View style={styles.welcomeSection}>
        
        <Text style={styles.welcomeTitle}>Welcome to{"\n"}</Text>
        <Image source={Logo} style={{height: 256, width: 256, borderRadius: 400/2}} />
        <Text style={styles.welcomeSub}>{"\n"}Your guide to the world around you</Text>
      </View>
      <View style={styles.welcomeButton}>
        <Button title="Explore" onPress={() => navigation.navigate("Explore")} />
        <Button title="Navigate" onPress={() => navigation.navigate("Navigate")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7d6ab', //@Sander maybe if you can make a minimalistic floral design (a 2 color background) so it looks like vines and what not
  },
  welcomeSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 56,
    textAlign: 'center',
    //fontFamily: 'twinkle-star-regular',
  },
  welcomeSub: {
    fontSize: 28,
    textAlign: 'center',
  },
  welcomeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
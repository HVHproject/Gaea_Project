# Gaea_Project
An app for discovering the world around you. This is a capstone Joseph and Aleksander are working on for the Spring 2022 semester.

## How do I run this app?
#### Step 1: Install Expo on your computer and Expo/Expo Go on your device
Computer installation : https://docs.expo.dev/get-started/installation/  
Android installation  : https://play.google.com/store/apps/details?id=host.exp.exponent  
Apple installation    : https://apps.apple.com/app/expo-go/id982107779  

#### Step 2: Download this project and save it in a folder.

#### Step 3: In that folder, run npm install.
run npm install react-native-maps  
This should download everything you need to run the project. If errors occur, you may need to install missing packages.  
As time passes, packages can update and something could break.  

#### Step 4: Get the needed API keys.
Weather API              : https://openweathermap.org/api  
Weather API Key Tutorial : https://openweathermap.org/appid  
Google API               : https://mapsplatform.google.com/  
Google API Key Tutorial  : https://youtu.be/Tva5HvZLN7g?t=52 (0:54 - 4:10) by https://www.youtube.com/channel/UCeDirq_9MAW2JkbAlSjhWiQ  
Using their free plans is enough for this project to serve its purpose. This app isn't made for wide scale use.  

Make sure these aren't public (if you make a fork of this or share it with friends) so you don't have someone running up your credits!  

#### Step 5: Place the API keys in their needed spots in the "ExploreScreen.js".
Weather API : Line 12, replace "weatherApiKeyHere" with your Open Weather API key  
Google API  : Line 13, replace "googleApiKeyHere" with your Google API key  

#### Step 6: Run "npm start" in the terminal

#### Step 7: Scan the QR code with the Expo app (optionally you can install an android emulator on your computer and press "a" in the terminal.)
At this point everything should be good to go! If you run into issues, please submit an issue.  

#### Step 8 (optional): Install an Android emulator to run the app on your computer.
Android Emulator Installation Guide : https://docs.expo.dev/workflow/android-studio-emulator/

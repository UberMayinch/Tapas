// Project Setup
/*
1. First, install Expo CLI and create new project:
npx create-expo-app tapas-meditation
cd tapas-meditation
npx expo install react-native-web @expo/webpack-config

2. Install required dependencies:
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-safe-area-context react-native-screens
npm install @expo/vector-icons react-native-svg
*/

// App.js
import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';

export default function App() {
  return <ExpoRoot />;
}

registerRootComponent(App);



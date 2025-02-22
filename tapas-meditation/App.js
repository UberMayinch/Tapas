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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Sleep':
                  iconName = focused ? 'moon' : 'moon-outline';
                  break;
                case 'Explore':
                  iconName = focused ? 'compass' : 'compass-outline';
                  break;
                case 'Shloka':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6B4EFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Sleep" component={SleepScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="Shloka" component={ShlokaScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// screens/HomeScreen.js
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.greeting}>Good Morning, Tanish</Text>
      <Text style={styles.subGreeting}>We Wish you have a good day</Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.purpleCard]}>
          <View>
            <Text style={styles.cardTitle}>Continue</Text>
            <Text style={styles.cardSubtitle}>PANCHTANTRA</Text>
            <View style={styles.chapterContainer}>
              <Text style={styles.chapterText}>CHAPTER 1</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>START</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.orangeCard]}>
          <View>
            <Text style={styles.cardTitle}>Daily Challenge</Text>
            <Text style={styles.cardSubtitle}>GAME</Text>
            <View style={styles.rewardsContainer}>
              <Text style={styles.rewardsText}>2 REWARDS</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>START</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.shlokaCard}>
        <Text style={styles.shlokaTitle}>Shloka Practice</Text>
        <Text style={styles.shlokaSubtitle}>MEDITATION • 3-10 MIN</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recommended for you</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedContainer}>
        {/* Add recommended cards here */}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    height: 160,
  },
  purpleCard: {
    backgroundColor: '#6B4EFF',
  },
  orangeCard: {
    backgroundColor: '#FFA726',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  chapterContainer: {
    marginTop: 'auto',
  },
  chapterText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shlokaCard: {
    backgroundColor: '#2C2C2E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  shlokaTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shlokaSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recommendedContainer: {
    marginBottom: 24,
  },
});

export default HomeScreen;

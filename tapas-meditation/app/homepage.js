import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import BottomTabs from './BottomTabs';
import { router } from 'expo-router';

// Import local background images
const panchtantraBg = require('../assets/images/homepage/panchtantra-bg.png');
const dailyChallengeBg = require('../assets/images/homepage/daily-challenge-bg.png');
const shlokaBg = require('../assets/images/homepage/shloka-bg.png');
const recommended1Bg = require('../assets/images/homepage/recommended-1.png');
const recommended2Bg = require('../assets/images/homepage/recommended-2.png');
const recommended3Bg = require('../assets/images/homepage/recommended-3.png');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top section: App name and greeting */}
        <Text style={styles.appTitle}>Tapas</Text>
        <Text style={styles.greeting}>Good Morning, Tanish</Text>
        <Text style={styles.subGreeting}>We Wish you have a good day</Text>
        
        {/* Row with two large cards */}
        <View style={styles.cardRow}>
          {/* Left card: Continue PanchTantra */}
          <TouchableOpacity 
            style={styles.cardContainer} 
            onPress={() => router.push('/Chapters')}
          >
            <ImageBackground
              source={panchtantraBg}
              style={styles.cardBackground}
              imageStyle={styles.cardBackgroundImage}
            >
              <Text style={styles.cardTitle}>Continue</Text>
              <Text style={styles.cardSubtitle}>PanchTantra</Text>
              <Text style={styles.cardSubtitle}>Chapter 1</Text>
              <View style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* Right card: Daily Challenge */}
          <TouchableOpacity style={styles.cardContainer}>
            <ImageBackground
              source={dailyChallengeBg}
              style={styles.cardBackground}
              imageStyle={styles.cardBackgroundImage}
            >
              <Text style={styles.cardTitle}>Daily Challenge</Text>
              <Text style={styles.cardSubtitle}>Game</Text>
              <Text style={styles.cardSubtitle}>2 Rewards</Text>
              <View style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Shloka Practice Card */}
        <View style={styles.shlokaCardContainer}>
          <ImageBackground
            source={shlokaBg}
            style={styles.shlokaBackground}
            imageStyle={styles.shlokaBackgroundImage}
          >
            <Text style={styles.shlokaTitle}>Shloka Practice</Text>
            <Text style={styles.shlokaSubtitle}>Meditation - 3-10 MIN</Text>
          </ImageBackground>
        </View>

        {/* Recommended for you */}
        <Text style={styles.recommendedTitle}>Recommended for you</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {/* Recommended Card 1 */}
          <View style={styles.recommendedCardContainer}>
            <ImageBackground
              source={recommended1Bg}
              style={styles.recommendedBackground}
              imageStyle={styles.recommendedBackgroundImage}
            >
              <Text style={styles.recommendedCardTitle}>PanchTantra</Text>
              <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
            </ImageBackground>
          </View>

          {/* Recommended Card 2 */}
          <View style={styles.recommendedCardContainer}>
            <ImageBackground
              source={recommended2Bg}
              style={styles.recommendedBackground}
              imageStyle={styles.recommendedBackgroundImage}
            >
              <Text style={styles.recommendedCardTitle}>Ramayana</Text>
              <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
            </ImageBackground>
          </View>

          {/* Recommended Card 3 */}
          <View style={styles.recommendedCardContainer}>
            <ImageBackground
              source={recommended3Bg}
              style={styles.recommendedBackground}
              imageStyle={styles.recommendedBackgroundImage}
            >
              <Text style={styles.recommendedCardTitle}>Mahabharata</Text>
              <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
            </ImageBackground>
          </View>

          {/* Add more horizontal cards as needed */}
        </ScrollView>
      </ScrollView>

      {/* Bottom Tabs (reusable component) */}
      <BottomTabs />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingTop: 50,
    paddingBottom: 80, // Leave space for bottom tabs
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },

  // Card row
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 1, // Add small gap between cards
  },
  cardContainer: {
    width: '50%', // Slightly increase width to reduce right gap
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor removed; we now have an ImageBackground
  },
  cardBackground: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
    padding: 12,
    paddingRight: 6,
  },
  cardBackgroundImage: {
    borderRadius: 10,  // Match container's border radius
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // black text on background
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  startButton: {
    marginTop: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontWeight: '600',
    color: '#000',
  },

  // Shloka card
  shlokaCardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  shlokaBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 15,
    
  },
  shlokaBackgroundImage: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  shlokaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  shlokaSubtitle: {
    fontSize: 14,
    color: '#EEE',
  },

  // Recommended section
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  recommendedCardContainer: {
    width: 130,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  recommendedBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
  },
  recommendedBackgroundImage: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  recommendedCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  recommendedCardSubtitle: {
    fontSize: 12,
    color: '#EEE',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import BottomTabs from './BottomTabs';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


// Local images
const panchtantraBg = require('../assets/images/homepage/panchtantra-bg.png');
const ramayanaBg = require('../assets/images/homepage/panchtantra-bg.png');
const trophyIcon = require('../assets/images/homepage/trophy-yellow.png');
const streakIcon = require('../assets/images/homepage/trophy-yellow.png');

const ParentScreen = () => {
    const router = useRouter();
    const goTo = (screen) => router.push(`/${screen}`);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <Text style={styles.greeting}>Hi Parent!</Text>

        {/* Create New Story Card */}
        <TouchableOpacity style={styles.createCard}>
          <View style={styles.createCardContent}>
            <View>
              <Text style={styles.createTitle}>Create New Story</Text>
              <Text style={styles.createSubtitle}>APR 30 • PAUSE PRACTICE</Text>
            </View>
            <Ionicons name="add-circle" size={32} color="#2D2D2D" />
          </View>
        </TouchableOpacity>

        {/* Milestones Section */}
        <Text style={styles.sectionTitle}>Let's share Tanish’s Milestones</Text>
        <View style={styles.cardRow}>
          <ImageBackground source={panchtantraBg} style={styles.cardBackground} imageStyle={styles.milestoneImage}>
            <Text style={styles.milestoneTitle}>Panchtantra</Text>
            <Text style={styles.milestoneSubtitle}>100% Completed</Text>
          </ImageBackground>

          <ImageBackground source={ramayanaBg} style={styles.cardBackground} imageStyle={styles.milestoneImage}>
            <Text style={styles.milestoneTitle}>Ramayana</Text>
            <Text style={styles.milestoneSubtitle}>MEDITATION - 3-10 MIN</Text>
          </ImageBackground>

          <TouchableOpacity 
                      style={styles.cardContainer} 
                      onPress={() => router.push('chapters/Chapters')}
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
                        source={panchtantraBg}
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

        {/* Recent Achievements */}
        <Text style={styles.sectionTitle}>Recent Achievements</Text>

        {/* <View style={styles.achievementRow}>
            <View style={styles.achievementText}>
                <Text style={styles.achievementTitle}>100% Recitation</Text>
                <Text style={styles.achievementSubtitle}>Panchtantra</Text>
            </View>
            <ImageBackground source={trophyIcon} style={styles.achievementIcon} imageStyle={styles.achievementIconImg} />
        </View> */}

<TouchableOpacity 
  style={styles.achievementRow} 
  onPress={() => goTo('ShareScreen')} // Navigate to ShareScreen on press
>
  <View style={styles.achievementText}>
    <Text style={styles.achievementTitle}>100% Recitation</Text>
    <Text style={styles.achievementSubtitle}>Panchtantra</Text>
  </View>
  <ImageBackground 
    source={trophyIcon} 
    style={styles.achievementIcon} 
    imageStyle={styles.achievementIconImg} 
  />
</TouchableOpacity>


        {/* <View style={styles.achievementRow}>
          <View style={styles.achievementText}>
            <Text style={styles.achievementTitle}>100% Recitation</Text>
            <Text style={styles.achievementSubtitle}>Panchtantra</Text>
          </View>
          <ImageBackground source={trophyIcon} style={styles.achievementIcon} imageStyle={styles.achievementIconImg} />
        </View> */}

        <View style={styles.achievementRow}>
          <View style={styles.achievementText}>
            <Text style={styles.achievementTitle}>1 Month Streak</Text>
            <Text style={styles.achievementSubtitle}>Achieved Today</Text>
          </View>
          <ImageBackground source={streakIcon} style={styles.achievementIcon} imageStyle={styles.achievementIconImg} />
        </View>
      </ScrollView>

      <BottomTabs />
    </View>
  );
};

export default ParentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  createCard: {
    backgroundColor: '#FFE1AD',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  createCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  createSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  milestoneCard: {
    width: '48%',
    height: 120,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-end',
  },
  milestoneImage: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  milestoneSubtitle: {
    fontSize: 12,
    color: '#EEE',
  },
  achievementRow: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  achievementSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    marginLeft: 16,
  },
  achievementIconImg: {
    resizeMode: 'contain',
    borderRadius: 10,
  },
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
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function StoryPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/images/story-bg.png')}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <BlurView intensity={30} tint="light" style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Clever Crow</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Player Controls */}
      <View style={styles.playerContainer}>
        <View style={styles.controls}>
          <TouchableOpacity>
            <Ionicons name="reload-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color="#000" 
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="sync-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>01:30</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onValueChange={setProgress}
            minimumTrackTintColor="#6B4EFF"
            maximumTrackTintColor="#D0D0D0"
            thumbTintColor="#6B4EFF"
          />
          <Text style={styles.timeText}>45:00</Text>
        </View>

        {/* Subtitles */}
        <View style={styles.subtitlesContainer}>
          <Text style={styles.subtitles}>
            It's not many of us, we smile at each other{'\n'}
            But how many honest? Trust issues{'\n'}
            Switched up the number, I can't be bothered
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  timeText: {
    color: '#000',
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  subtitlesContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
  subtitles: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
  },
}); 
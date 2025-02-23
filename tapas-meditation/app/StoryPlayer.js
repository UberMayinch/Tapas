import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Video } from 'expo-av';

export default function StoryPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const videoRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;
  const videoHeight = (screenWidth * 9) / 16; // 16:9 aspect ratio

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / status.durationMillis);
      setDuration(status.durationMillis);
      setPositionMillis(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = async (value) => {
    if (videoRef.current && duration) {
      const newPosition = value * duration;
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BlurView intensity={30} tint="light" style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="chevron-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Clever Crow</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={require('../assets/videos/arjuna.mp4')}
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            useNativeControls={false}
          />
        </View>

        {/* Controls Container */}
        <View style={styles.controlsContainer}>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => videoRef.current?.replayAsync()}>
              <Ionicons name="reload-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={handlePlayPause}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="#000" 
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="sync-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#6B4EFF"
              maximumTrackTintColor="#D0D0D0"
              thumbTintColor="#6B4EFF"
            />
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <View style={styles.subtitlesContainer}>
            <Text style={styles.subtitles}>
              It's not many of us, we smile at each other{'\n'}
              But how many honest? Trust issues{'\n'}
              Switched up the number, I can't be bothered
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    marginTop: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  timeText: {
    color: '#FFF',
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  subtitlesContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  subtitles: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
}); 
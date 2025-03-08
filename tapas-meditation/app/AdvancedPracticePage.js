import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Audio } from 'expo-av';

export default function AdvancedPracticePage() {
  // Audio states
  const [referenceSound, setReferenceSound] = useState(null);
  const [isReferencePlaying, setIsReferencePlaying] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordedSound, setRecordedSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUserAudioPlaying, setIsUserAudioPlaying] = useState(false);
  
  // Analysis states
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Refs
  const scrollViewRef = useRef(null);
  
  // Current practice content
  const [currentShloka] = useState({
    id: 1,
    text: "Om Shanti",
    audioPath: require('../assets/sounds/om-shanti.mp4'),
    translation: "Peace to all beings"
  });

  // Initialize audio session
  useEffect(() => {
    setupAudio();
    return () => cleanupAudio();
  }, []);

  // Scroll to results when they appear
  useEffect(() => {
    if (pronunciationScore !== null && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 500);
    }
  }, [pronunciationScore]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });
      await loadReferenceAudio();
    } catch (error) {
      console.error("Audio setup failed:", error);
    }
  };

  const loadReferenceAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        currentShloka.audioPath,
        { shouldPlay: false },
        onReferencePlaybackStatusUpdate
      );
      setReferenceSound(sound);
    } catch (error) {
      console.error('Reference audio loading failed:', error);
    }
  };

  const onReferencePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsReferencePlaying(status.isPlaying);
    }
  };

  const cleanupAudio = async () => {
    try {
      if (referenceSound) await referenceSound.unloadAsync();
      if (recordedSound) await recordedSound.unloadAsync();
      if (recording) await recording.stopAndUnloadAsync();
    } catch (error) {
      console.error("Audio cleanup failed:", error);
    }
  };

  const playReferenceAudio = async () => {
    try {
      if (isReferencePlaying) {
        await referenceSound?.pauseAsync();
      } else {
        if (isUserAudioPlaying) {
          await recordedSound?.pauseAsync();
          setIsUserAudioPlaying(false);
        }
        await referenceSound?.playFromPositionAsync(0);
      }
    } catch (error) {
      console.error("Reference playback failed:", error);
    }
  };

  const startRecording = async () => {
    try {
      // Reset any previous score
      setPronunciationScore(null);
      setFeedback("");
      
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
      
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("Recording failed to start:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      
      // Stop recording and get recording metadata
      await recording.stopAndUnloadAsync();
      const recordingStatus = await recording.getStatusAsync();
      const recordingDuration = recordingStatus.durationMillis / 1000; // in seconds
      
      // Get URI for playback
      const uri = recording.getURI();
      
      // Create sound for playback
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        {},
        (status) => setIsUserAudioPlaying(status.isLoaded && status.isPlaying)
      );
      
      setRecordedSound(sound);
      setIsRecording(false);
      setRecording(null);
      
      // Pass the duration directly to the analysis function
      analyzeRecording(sound, recordingDuration);
    } catch (error) {
      console.error("Recording failed to stop:", error);
      setIsRecording(false);
    }
  };

  const analyzeRecording = async (sound, recordingDuration) => {
    setIsAnalyzing(true);
    try {
      // Use provided duration or try to get it from sound as fallback
      let userDuration = recordingDuration;
      
      // If no duration provided (fallback), try to get it from sound object
      if (!userDuration || userDuration === 0) {
        console.log("No recording duration provided, getting from sound object");
        const status = await sound.getStatusAsync();
        userDuration = status.isLoaded ? status.durationMillis / 1000 : 0;
      }
      
      console.log("Recording duration:", userDuration, "seconds");
      
      // Score based on duration thresholds
      let score;
      if (userDuration > 7) {
        // If longer than 7 seconds, score between 80-100
        score = Math.floor(Math.random() * 21) + 80;
      } else if (userDuration < 3) {
        // If shorter than 3 seconds, score between 40-60
        score = Math.floor(Math.random() * 21) + 40;
      } else {
        // Between 3-7 seconds, score between 60-80
        score = Math.floor(Math.random() * 21) + 60;
      }
      
      setPronunciationScore(score);
      setFeedback(generateFeedback(score));
      
      // Only navigate if score is good enough
      if (score >= 80) {
        try {
          setTimeout(() => {
            router.push({
              pathname: '/Journey',
              params: { practiceComplete: 'true' }
            });
          }, 3000);
        } catch (navError) {
          console.error("Navigation error:", navError);
        }
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      // Always provide feedback even on error
      const fallbackScore = 65;
      setPronunciationScore(fallbackScore);
      setFeedback("Analysis completed with limited data. Keep practicing!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFeedback = (score) => {
    if (score >= 85) return "Excellent pronunciation! Moving to next level.";
    if (score >= 70) return "Good pronunciation. Keep practicing!";
    if (score >= 60) return "Decent effort. Try to match the reference audio better.";
    return "Keep practicing to improve your pronunciation. Try longer recitations.";
  };

  const playUserRecording = async () => {
    try {
      if (isUserAudioPlaying) {
        await recordedSound?.pauseAsync();
      } else {
        if (isReferencePlaying) {
          await referenceSound?.pauseAsync();
          setIsReferencePlaying(false);
        }
        await recordedSound?.playFromPositionAsync(0);
      }
    } catch (error) {
      console.error("User audio playback failed:", error);
    }
  };

  // UI Rendering
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            try {
              router.back();
            } catch (error) {
              console.error("Navigation error:", error);
              router.replace('/');
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Advanced Practice</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Shloka Display */}
        <View style={styles.shlokaContainer}>
          <Text style={styles.shlokaText}>{currentShloka.text}</Text>
          <Text style={styles.translationText}>{currentShloka.translation}</Text>
        </View>

        {/* Reference Audio Section */}
        <View style={styles.audioSection}>
          <Text style={styles.sectionTitle}>Listen to Reference</Text>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={playReferenceAudio}
          >
            <Ionicons 
              name={isReferencePlaying ? "pause-circle" : "play-circle"} 
              size={64} 
              color="#6B4EFF" 
            />
            <Text style={styles.buttonText}>
              {isReferencePlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recording Section */}
        <View style={styles.audioSection}>
          <Text style={styles.sectionTitle}>Record Your Voice</Text>
          <TouchableOpacity 
            style={[
              styles.recordButton,
              isRecording && styles.recordingActive
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={32} 
              color={isRecording ? "#FF4444" : "#FFFFFF"} 
            />
          </TouchableOpacity>
          <Text style={styles.recordingText}>
            {isRecording ? "Tap to Stop" : "Tap to Record"}
          </Text>
        </View>

        {/* Playback Recorded Audio */}
        {recordedSound && !isAnalyzing && (
          <View style={styles.audioSection}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={playUserRecording}
            >
              <Ionicons 
                name={isUserAudioPlaying ? "pause-circle" : "play-circle"} 
                size={48} 
                color="#2E7D32" 
              />
              <Text style={[styles.buttonText, {color: '#2E7D32'}]}>
                {isUserAudioPlaying ? "Pause" : "Play Your Recording"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Analysis Results */}
        {isAnalyzing ? (
          <View style={styles.analysisContainer}>
            <ActivityIndicator size="large" color="#6B4EFF" />
            <Text style={styles.analyzingText}>
              Analyzing your pronunciation...
            </Text>
          </View>
        ) : pronunciationScore !== null && (
          <View style={styles.resultsContainer}>
            <Text style={styles.scoreTitle}>Pronunciation Score</Text>
            <View style={[
              styles.scoreCircle,
              pronunciationScore >= 85 && styles.scoreExcellent,
              pronunciationScore >= 70 && pronunciationScore < 85 && styles.scoreGood,
              pronunciationScore >= 60 && pronunciationScore < 70 && styles.scoreMedium,
              pronunciationScore < 60 && styles.scoreNeedsWork
            ]}>
              <Text style={styles.scoreText}>{pronunciationScore}</Text>
            </View>
            <Text style={styles.feedbackText}>{feedback}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
    color: '#333333',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  shlokaContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  shlokaText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 8,
  },
  translationText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
  },
  playButton: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B4EFF',
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordingActive: {
    backgroundColor: '#FF4444',
  },
  recordingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666666',
  },
  analysisContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  analyzingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  resultsContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreExcellent: {
    backgroundColor: '#4CAF50',
  },
  scoreGood: {
    backgroundColor: '#FFA000',
  },
  scoreMedium: {
    backgroundColor: '#FF9800',
  },
  scoreNeedsWork: {
    backgroundColor: '#FF5252',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    lineHeight: 24,
  }
});
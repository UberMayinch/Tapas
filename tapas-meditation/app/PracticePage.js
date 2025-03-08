import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export default function PracticePage() {
  // Words to display as options
  const [words] = useState(['Namaste', 'Guru', 'Shanti', 'Om']);
  
  // Track selected words in order
  const [selectedWords, setSelectedWords] = useState([]);
  
  // Sound objects
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundLoaded, setSoundLoaded] = useState(false);
  
  // Animation values
  const [feedbackColor] = useState(new Animated.Value(0));
  const [feedbackOpacity] = useState(new Animated.Value(0));
  const [wordScales] = useState(words.map(() => new Animated.Value(1)));
  
  // Word colors (for highlighting selected words)
  const [wordColors, setWordColors] = useState(words.map(() => 'black'));
  
  // Correct sequence
  const correctSequence = ['Om', 'Shanti'];
  
  // Load sound on component mount - but don't play automatically
  useEffect(() => {
    console.log("Component mounted, loading sound...");
    loadSound();
    
    return () => {
      console.log("Component unmounting, cleaning up sound...");
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Load the audio file
  const loadSound = async () => {
    try {
      console.log("Attempting to load audio file...");
      
      // Create the sound object but don't play it yet
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/om-shanti.mp4'),
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      setSoundLoaded(true);
      console.log("Sound loaded successfully!");
    } catch (error) {
      console.error('Error loading sound:', error);
      Alert.alert(
        "Audio Error", 
        "Could not load the audio file. Please check the file path and format."
      );
    }
  };
  
  // Monitor playback status
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    } else if (status.error) {
      console.error(`Encountered a playback error: ${status.error}`);
    }
  };
  
  // Play the audio - now with improved error handling
  const playSound = async () => {
    try {
      console.log("Play button pressed");
      
      // Provide haptic feedback
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      if (sound) {
        if (isPlaying) {
          console.log("Already playing, pausing...");
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          console.log("Starting playback...");
          await sound.setPositionAsync(0);
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        console.warn("Sound object is null, attempting to reload...");
        await loadSound();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert(
        "Playback Error",
        "Unable to play audio. Please try again."
      );
      setIsPlaying(false);
    }
  };
  
  // Handle word selection
  const handleWordPress = (word, index) => {
    console.log(`Word pressed: ${word} at index ${index}`);
    
    // Provide haptic feedback on non-web platforms
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Animate the word press
    Animated.sequence([
      Animated.timing(wordScales[index], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wordScales[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Add word to selected words
    const newSelectedWords = [...selectedWords, word];
    setSelectedWords(newSelectedWords);
    
    // Check if we have enough words to validate
    if (newSelectedWords.length === correctSequence.length) {
      validateSequence(newSelectedWords);
    }
  };
  
  // Clear selected words
  const clearSelection = () => {
    setSelectedWords([]);
    // Reset all word colors
    setWordColors(words.map(() => 'black'));
  };
  
  // Validate the selected sequence
  const validateSequence = (sequence) => {
    const isCorrect = sequence.join(' ') === correctSequence.join(' ');
    console.log(`Sequence validation: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);
    
    // Color all selected words
    const newColors = [...wordColors];
    
    // Find indices of selected words
    const indices = sequence.map(word => words.indexOf(word));
    
    // Set colors based on correctness
    indices.forEach(idx => {
      if (idx >= 0) { // Only process valid indices
        newColors[idx] = isCorrect ? '#4CAF50' : '#F44336'; // Green for correct, red for incorrect
      }
    });
    
    setWordColors(newColors);
    
    // Show feedback animation
    feedbackColor.setValue(isCorrect ? 1 : 0);
    
    Animated.sequence([
      Animated.timing(feedbackOpacity, {
        toValue: 0.8, // Semi-transparent overlay
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isCorrect) {
        // If correct, navigate back to Journey with parameter to unlock next chapter
        console.log("Correct sequence! Navigating back to Journey...");
        setTimeout(() => {
          router.push({
            pathname: '/Journey',
            params: { practiceComplete: 'true' }
          });
        }, 1000);
      }
    });
  };

  // Interpolate colors for feedback background
  const backgroundColor = feedbackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(244, 67, 54, 1)', 'rgba(76, 175, 80, 1)'], // Red to Green
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => {
          console.log("Back button pressed");
          router.back();
        }}
        activeOpacity={0.7}
        testID="backButton"
      >
        <MaterialIcons name="chevron-left" size={30} color="#333" />
      </TouchableOpacity>
      
      {/* Feedback overlay */}
      <Animated.View 
        style={[
          styles.feedbackOverlay,
          {
            backgroundColor,
            opacity: feedbackOpacity,
          }
        ]}
        pointerEvents="none"
      >
        <MaterialIcons 
          name={feedbackColor.__getValue() === 1 ? "check-circle" : "cancel"} 
          size={80} 
          color="#FFF" 
        />
        <Text style={styles.feedbackText}>
          {feedbackColor.__getValue() === 1 ? "Correct!" : "Try Again"}
        </Text>
      </Animated.View>
      
      <Text style={styles.title}>Practice Time</Text>
      
      {/* Audio player */}
      <View style={styles.audioContainer}>
        <TouchableOpacity 
          style={[
            styles.audioButton, 
            isPlaying && styles.audioButtonActive
          ]}
          onPress={() => {
            console.log("Audio button pressed");
            playSound();
          }}
          disabled={!soundLoaded}
          activeOpacity={0.7}
          testID="audioButton"
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        >
          <MaterialIcons 
            name={isPlaying ? "pause" : "play-arrow"} 
            size={40} 
            color="#FFF" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Selected words display */}
      <View style={styles.selectedWordsContainer}>
        {selectedWords.length > 0 ? (
          <View style={styles.selectedWordsBox}>
            <Text style={styles.selectedWordsText}>
              {selectedWords.join(' ')}
            </Text>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                console.log("Clear button pressed");
                clearSelection();
              }}
              activeOpacity={0.7}
              testID="clearButton"
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      
      {/* Word options */}
      <View style={styles.wordsContainer}>
        <View style={styles.wordRow}>
          {words.slice(0, 2).map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.wordButton, { borderColor: wordColors[index] }]}
              onPress={() => {
                console.log(`Word button pressed: ${word}`);
                handleWordPress(word, index);
              }}
              activeOpacity={0.6}
              testID={`wordButton-${index}`}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Animated.Text 
                style={[
                  styles.wordText, 
                  { color: wordColors[index], transform: [{ scale: wordScales[index] }] }
                ]}
              >
                {word}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.wordRow}>
          {words.slice(2, 4).map((word, index) => (
            <TouchableOpacity
              key={index + 2}
              style={[styles.wordButton, { borderColor: wordColors[index + 2] }]}
              onPress={() => {
                console.log(`Word button pressed: ${word}`);
                handleWordPress(word, index + 2);
              }}
              activeOpacity={0.6}
              testID={`wordButton-${index + 2}`}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Animated.Text 
                style={[
                  styles.wordText, 
                  { color: wordColors[index + 2], transform: [{ scale: wordScales[index + 2] }] }
                ]}
              >
                {word}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Hint */}
      <Text style={styles.hintText}>
        Listen to the audio and tap the words in the correct order
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    zIndex: 0, // Explicitly set z-index
    position: 'relative',
  },
  closeButton: {
    padding: 10,
    alignSelf: 'flex-start',
    zIndex: 5, // Ensure buttons are above other elements
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
  },
  audioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    zIndex: 5, // Ensure buttons are above other elements
  },
  audioButton: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make it perfectly round
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Increased elevation for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  audioButtonActive: {
    backgroundColor: '#5030DD',
  },
  selectedWordsContainer: {
    alignItems: 'center',
    marginBottom: 30,
    minHeight: 50,
    zIndex: 5, // Ensure this is above other elements
  },
  selectedWordsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    minWidth: 150,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9', // Light background for better visibility
  },
  selectedWordsText: {
    fontSize: 18,
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 10,
    padding: 5,
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Make sure it's on top
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  wordsContainer: {
    marginTop: 20, // Add space
    zIndex: 5, // Ensure buttons are above other elements
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20, // Add more space between rows
  },
  wordButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
    marginHorizontal: 10, // Add horizontal space
    borderWidth: 2, // Make border more visible
    borderColor: 'transparent', // Start with transparent border
    elevation: 3, // Increased elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '500',
  },
  hintText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 14,
  },
});
// Update the checkSequence function in PracticePage.js


// const checkSequence = () => {
//   // Check if selected words match correct sequence
//   const isCorrect = compareArrays(selectedWords, correctSequence);
  
//   // Create feedback animation
//   createFeedbackAnimation(isCorrect);
  
//   if (isCorrect) {
//     // Set word colors to green for correct sequence
//     const newColors = [...wordColors];
//     selectedWords.forEach((word) => {
//       const index = words.indexOf(word);
//       if (index !== -1) {
//         newColors[index] = '#4CAF50'; // Green
//       }
//     });
//     setWordColors(newColors);
    
//     // Wait for animation to complete, then navigate back
//     setTimeout(() => {
//       // Navigate to Journey screen with parameter to unlock chapter 3
//       router.push({
//         pathname: '/Journey',
//         params: { practiceComplete: 'true' }
//       });
//     }, 2000); // Wait 2 seconds for animation to finish
//   } else {
//     // Set word colors to red for incorrect sequence
//     const newColors = [...wordColors];
//     selectedWords.forEach((word) => {
//       const index = words.indexOf(word);
//       if (index !== -1) {
//         newColors[index] = '#F44336'; // Red
//       }
//     });
//     setWordColors(newColors);
    
//     // Reset after a delay
//     setTimeout(() => {
//       setSelectedWords([]);
//       setWordColors(words.map(() => 'black'));
//     }, 1500);
//   }
// };


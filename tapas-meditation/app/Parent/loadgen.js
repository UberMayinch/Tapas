import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  SafeAreaView
} from 'react-native';
import { router } from 'expo-router';

export default function LoadingScreen({ route }) {
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const progressAnim = new Animated.Value(0);
  
  // Simulate loading progress
  useEffect(() => {
    // Start with 22% as shown in the design
    setProgress(0.22);
    setPercentage(22);
    
    // Simulate progress increasing over time
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 0.05;
        if (newProgress >= 1) {
          clearInterval(interval);
          // Navigate to course check screen when complete
          setTimeout(() => {
            router.push('/Parent/coursecheck');
          }, 500);
          return 1;
        }
        
        // Update percentage display
        setPercentage(Math.round(newProgress * 100));
        
        return newProgress;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animate the progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [progress]);
  
  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi Parent!</Text>
        
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            We are creating a personalized journey for your child!
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.percentage}>{percentage}%</Text>
          
          <View style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width }
              ]} 
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  messageContainer: {
    marginBottom: 60,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  progressContainer: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 5,
  }
});
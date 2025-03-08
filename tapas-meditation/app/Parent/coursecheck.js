import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CourseCheckScreen() {
  // Sample course data
  const courseData = {
    title: "The Clever Crow",
    description: "A story about problem-solving and resourcefulness",
    learningPoints: [
      "Problem-solving skills",
      "Resourcefulness",
      "Patience and perseverance",
      "Critical thinking"
    ],
    activities: [
      "Story listening",
      "Comprehension questions",
      "Interactive game",
      "Drawing activity"
    ]
  };

  const handleStartLearning = () => {
    // Navigate to the Journey screen with the story ID
    router.push({
      pathname: '/Journey',
      params: { storyId: '1' }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Course Ready!</Text>
        
        <View style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <Ionicons name="book" size={24} color="#6B4EFF" />
            <Text style={styles.courseTitle}>{courseData.title}</Text>
          </View>
          
          <Text style={styles.courseDescription}>
            {courseData.description}
          </Text>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Learning Points</Text>
            {courseData.learningPoints.map((point, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color="#6B4EFF" />
                <Text style={styles.listItemText}>{point}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Activities</Text>
            {courseData.activities.map((activity, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="star" size={20} color="#6B4EFF" />
                <Text style={styles.listItemText}>{activity}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleStartLearning}
          >
            <Text style={styles.buttonText}>Start Learning</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/Parent/parent')}
          >
            <Text style={styles.secondaryButtonText}>Modify Course</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  courseDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#444',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6B4EFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6B4EFF',
  },
  secondaryButtonText: {
    color: '#6B4EFF',
    fontSize: 16,
    fontWeight: '500',
  }
});
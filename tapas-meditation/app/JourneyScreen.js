// app/screens/JourneyScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function JourneyScreen({ route }) {
  const { storyId } = route.params;

  const chapters = [
    { id: 1, title: 'Chapter 1: The Beginning', progress: '100%' },
    { id: 2, title: 'Chapter 2: The Challenge', progress: '50%' },
    { id: 3, title: 'Chapter 3: The Resolution', progress: '0%' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>60% Complete</Text>
      </View>

      <View style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <TouchableOpacity key={chapter.id} style={styles.chapterCard}>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
            <View style={styles.chapterProgress}>
              <View style={styles.progressIndicator}>
                <View 
                  style={[
                    styles.progressIndicatorFill, 
                    { width: chapter.progress }
                  ]} 
                />
              </View>
              <Text style={styles.progressPercentage}>{chapter.progress}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 4,
  },
  progressText: {
    color: '#666',
    fontSize: 14,
  },
  chaptersContainer: {
    gap: 16,
  },
  chapterCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  chapterProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressIndicator: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressIndicatorFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: 12,
    color: '#666',
    width: 40,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function JourneyScreen() {
  const { storyId } = useLocalSearchParams();

  const chapters = [
    { id: 1, title: 'START', isActive: true, isLocked: false, icon: 'star' },
    { id: 2, title: 'Chapter 2', isActive: false, isLocked: true, icon: 'lock' },
    { id: 3, title: 'Chapter 3', isActive: false, isLocked: true, icon: 'lock' },
    { id: 4, title: 'Chapter 4', isActive: false, isLocked: true, icon: 'lock' },
    { id: 5, title: 'Chapter 5', isActive: false, isLocked: true, icon: 'lock' },
  ];

  return (
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.pathContainer}>
        {chapters.map((chapter, index) => (
          <View key={chapter.id} style={styles.chapterSection}>
            <View style={styles.nodeContainer}>
              {index > 0 && (
                <View 
                  style={[
                    styles.pathLine, 
                    chapter.isLocked && styles.pathLineLocked,
                    !chapter.isLocked && styles.pathLineActive
                  ]} 
                />
              )}
              <TouchableOpacity 
                style={[
                  styles.node,
                  chapter.isActive && styles.nodeActive,
                  chapter.isLocked && styles.nodeLocked
                ]}
                disabled={chapter.isLocked}
                onPress={() => router.push('/StoryPlayer')}
              >
                <MaterialIcons 
                  name={chapter.icon} 
                  size={24} 
                  color={chapter.isActive ? '#FFF' : '#666'} 
                />
              </TouchableOpacity>
            </View>
            <Text style={[
              styles.chapterTitle,
              chapter.isLocked && styles.chapterTitleLocked
            ]}>
              {chapter.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  backButton: {
    padding: 8,
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
  pathContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 24,
  },
  chapterSection: {
    alignItems: 'center',
    gap: 12,
  },
  nodeContainer: {
    alignItems: 'center',
  },
  pathLine: {
    width: 2,
    height: 60,
    backgroundColor: '#DDD',
  },
  pathLineActive: {
    backgroundColor: '#6B4EFF',
  },
  pathLineLocked: {
    backgroundColor: '#DDD',
  },
  node: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeActive: {
    backgroundColor: '#6B4EFF',
  },
  nodeLocked: {
    backgroundColor: '#F0F0F0',
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chapterTitleLocked: {
    color: '#666',
  },
});

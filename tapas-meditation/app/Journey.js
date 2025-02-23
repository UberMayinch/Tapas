import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function JourneyScreen() {
  const { storyId } = useLocalSearchParams();
  const [unlockedChapters, setUnlockedChapters] = useState([1]); // Start with only first chapter unlocked

  useEffect(() => {
    // Check if StoryPlayer has been visited
    const checkStoryPlayerVisit = async () => {
      try {
        if (storyId === '1') {  // If first chapter was visited
          setUnlockedChapters(prev => {
            if (!prev.includes(2)) {
              return [...prev, 2];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Error checking story player visit:', error);
      }
    };
    
    checkStoryPlayerVisit();
  }, [storyId]);

  const chapters = [
    { id: 1, title: 'START', isActive: true, isLocked: false, icon: 'star' },
    { id: 2, title: 'Practice', isActive: false, isLocked: !unlockedChapters.includes(2), icon: unlockedChapters.includes(2) ? 'mic' : 'lock' },
    { id: 3, title: 'Chapter 3', isActive: false, isLocked: !unlockedChapters.includes(3), icon: unlockedChapters.includes(3) ? 'mic' : 'lock' },
    { id: 4, title: 'Chapter 4', isActive: false, isLocked: !unlockedChapters.includes(4), icon: unlockedChapters.includes(4) ? 'mic' : 'lock' },
    { id: 5, title: 'Chapter 5', isActive: false, isLocked: !unlockedChapters.includes(5), icon: unlockedChapters.includes(5) ? 'mic' : 'lock' },
  ];

  const handleChapterPress = (chapter) => {
    if (!chapter.isLocked) {
      if (chapter.id === 1) {
        router.push({
          pathname: '/StoryPlayer',
          params: { storyId: '1' }
        });
      } else if (chapter.id === 2) {
        router.push('/PracticePage');
      } else {
        router.push({
          pathname: '/StoryPlayer',
          params: { chapterId: chapter.id }
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="light" style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/Chapters')}
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
                onPress={() => handleChapterPress(chapter)}
              >
                <MaterialIcons 
                  name={chapter.icon} 
                  size={24} 
                  color={chapter.isLocked ? '#666' : '#000'} 
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

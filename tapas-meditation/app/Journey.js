import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JourneyScreen() {
  const params = useLocalSearchParams();
  const { storyId, practiceComplete } = params;
  const [unlockedChapters, setUnlockedChapters] = useState([1]);
  
  // Add debug logging
  console.log("Journey screen mounted with params:", JSON.stringify(params));
  console.log("Current unlocked chapters:", unlockedChapters);
  
  // Load saved unlocked chapters on mount
  useEffect(() => {
    const loadUnlockedChapters = async () => {
      try {
        const savedChapters = await AsyncStorage.getItem('unlockedChapters');
        console.log("Loaded chapters from storage:", savedChapters);
        if (savedChapters) {
          setUnlockedChapters(JSON.parse(savedChapters));
        }
      } catch (error) {
        console.error('Error loading unlocked chapters:', error);
      }
    };
    
    loadUnlockedChapters();
  }, []);
  
  // Handle chapter unlocking based on parameters
  useEffect(() => {
    const updateUnlockedChapters = async () => {
      console.log("Running update effect with:", { storyId, practiceComplete });
      try {
        // Create a new array instead of modifying the existing one
        const newUnlockedChapters = [...unlockedChapters];
        let hasChanges = false;
        
        // If first chapter was visited, unlock chapter 2
        if (storyId === '1' && !newUnlockedChapters.includes(2)) {
          newUnlockedChapters.push(2);
          hasChanges = true;
          console.log('Unlocking chapter 2 after StoryPlayer visit');
        }
        
        // If practice is complete, unlock chapter 3
        if (practiceComplete === 'true' && !newUnlockedChapters.includes(3)) {
          newUnlockedChapters.push(3);
          hasChanges = true;
          console.log('Unlocking chapter 3 after PracticePage completion');
        }
        
        // Only update state and save if changes were made
        if (hasChanges) {
          console.log('Updating chapters to:', newUnlockedChapters);
          setUnlockedChapters(newUnlockedChapters);
          await AsyncStorage.setItem('unlockedChapters', JSON.stringify(newUnlockedChapters));
        }
      } catch (error) {
        console.error('Error updating unlocked chapters:', error);
      }
    };
    
    updateUnlockedChapters();
  }, [storyId, practiceComplete, unlockedChapters]); // Add unlockedChapters to dependency array

  // Add a debug function to force unlock chapter 3
  const forceUnlockChapter3 = async () => {
    try {
      const newChapters = [...unlockedChapters];
      if (!newChapters.includes(2)) newChapters.push(2);
      if (!newChapters.includes(3)) newChapters.push(3);
      
      setUnlockedChapters(newChapters);
      await AsyncStorage.setItem('unlockedChapters', JSON.stringify(newChapters));
      console.log('Forced unlock of chapters 2 and 3');
    } catch (error) {
      console.error('Error forcing unlock:', error);
    }
  };

  // Add a reset function
  const resetUnlocks = async () => {
    try {
      setUnlockedChapters([1]);
      await AsyncStorage.setItem('unlockedChapters', JSON.stringify([1]));
      console.log('Reset to only chapter 1 unlocked');
    } catch (error) {
      console.error('Error resetting chapters:', error);
    }
  };

  const handleChapterPress = (chapter) => {
    if (chapter.isLocked) {
      // If locked, provide feedback but don't navigate
      console.log('Chapter is locked');
      return;
    }

    // Navigate based on chapter ID
    if (chapter.id === 1) {
      router.push('/StoryPlayer');
    } else if (chapter.id === 2) {
      // Navigate to practice page
      router.push('/PracticePage');
    } else if (chapter.id === 3) {
      // Navigate to the third chapter (new mic activity)
      router.push('/AdvancedPracticePage');
    } else {
      // Placeholder for future chapters
      console.log(`Navigate to chapter ${chapter.id}`);
    }
  };

  const chapters = [
    { id: 1, title: 'START', isActive: true, isLocked: false, icon: 'star' },
    { id: 2, title: 'Practice', isActive: false, isLocked: !unlockedChapters.includes(2), icon: unlockedChapters.includes(2) ? 'mic' : 'lock' },
    { id: 3, title: 'Advanced', isActive: false, isLocked: !unlockedChapters.includes(3), icon: unlockedChapters.includes(3) ? 'mic' : 'lock' },
    { id: 4, title: 'Chapter 4', isActive: false, isLocked: !unlockedChapters.includes(4), icon: unlockedChapters.includes(4) ? 'mic' : 'lock' },
    { id: 5, title: 'Chapter 5', isActive: false, isLocked: !unlockedChapters.includes(5), icon: unlockedChapters.includes(5) ? 'mic' : 'lock' },
  ];

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="light" style={styles.header}>
        <Text style={styles.headerTitle}>Your Learning Journey</Text>
      </BlurView>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.journeyContainer}>
          {chapters.map((chapter, index) => (
            <React.Fragment key={chapter.id}>
              {/* Journey node */}
              <TouchableOpacity
                onPress={() => handleChapterPress(chapter)}
                style={[
                  styles.journeyNode,
                  chapter.isActive ? styles.nodeActive : chapter.isLocked ? styles.nodeLocked : {},
                ]}
                disabled={chapter.isLocked}
              >
                <Ionicons
                  name={chapter.isLocked ? 'lock-closed' : chapter.icon}
                  size={24}
                  color={chapter.isLocked ? '#666' : '#FFF'}
                />
              </TouchableOpacity>
              
              {/* Chapter title */}
              <Text style={[
                styles.chapterTitle,
                chapter.isLocked ? styles.chapterTitleLocked : {}
              ]}>
                {chapter.title}
              </Text>
              
              {/* Connecting line (except after last item) */}
              {index < chapters.length - 1 && (
                <View style={[
                  styles.journeyLine,
                  { backgroundColor: unlockedChapters.includes(index + 2) ? '#6B4EFF' : '#DDD' }
                ]} />
              )}
            </React.Fragment>
          ))}
        </View>
        
        {/* Debug buttons - only show in development */}
        {/* {__DEV__ && (
          <View style={styles.debugContainer}>
            <TouchableOpacity style={styles.debugButton} onPress={forceUnlockChapter3}>
              <Text style={styles.debugText}>Debug: Unlock Ch.3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.debugButton} onPress={resetUnlocks}>
              <Text style={styles.debugText}>Debug: Reset</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  journeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  journeyNode: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  journeyLine: {
    width: 40,
    height: 3,
    backgroundColor: '#6B4EFF',
    marginHorizontal: 5,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  debugButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  debugText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
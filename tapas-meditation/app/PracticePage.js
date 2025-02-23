import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PracticePage() {
  const [words] = useState(['Namaste', 'Guru', 'Shanti', 'Om']);

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="close" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Tap what you hear</Text>

      {/* Audio Controls */}
      <View style={styles.audioContainer}>
        <TouchableOpacity style={styles.audioButton}>
          <MaterialIcons name="volume-up" size={32} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.audioButton}>
          <MaterialIcons name="speed" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Word Options */}
      <View style={styles.wordsContainer}>
        <View style={styles.wordRow}>
          {words.map((word, index) => (
            <TouchableOpacity key={index} style={styles.wordButton}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.wordRow}>
          {words.map((word, index) => (
            <TouchableOpacity key={index} style={styles.wordButton}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Profile Button */}
      <TouchableOpacity style={styles.profileButton}>
        <MaterialIcons name="person" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  closeButton: {
    padding: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
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
    gap: 20,
    marginBottom: 40,
  },
  audioButton: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordsContainer: {
    gap: 20,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  wordButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  wordText: {
    fontSize: 16,
    color: '#000',
  },
  profileButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
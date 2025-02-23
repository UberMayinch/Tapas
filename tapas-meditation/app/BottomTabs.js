import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BottomTabs = () => {
  const router = useRouter();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/homepage')}
      >
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.tabLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/GuruScreen')}
      >
        <Ionicons name="bed-outline" size={24} color="#000" />
        <Text style={styles.tabLabel}>Sleep</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/ExploreScreen')}
      >
        <Ionicons name="search-outline" size={24} color="#000" />
        <Text style={styles.tabLabel}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/StoryPlayer')}
      >
        <Ionicons name="book-outline" size={24} color="#000" />
        <Text style={styles.tabLabel}>Shloka</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/tanish')}
      >
        <Ionicons name="person-outline" size={24} color="#000" />
        <Text style={styles.tabLabel}>Tanish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#000',
  },
});

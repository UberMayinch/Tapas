// app/Chapters.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or another icon library
import { useRouter } from 'expo-router';
// Import your local image
import headingBg from '../../assets/images/homepage/chapters-bg.png';

export default function ChaptersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('watch'); // watch or challenge

  return (
    <View style={styles.container}>
      {/* Header with back arrow, title, heart icon, etc. */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.push('/homepage')} 
          style={styles.headerIconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panchtantra Tales</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Ionicons name="share-social-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image background for Heading Information */}
      <ImageBackground 
        source={headingBg} 
        style={styles.headingImageBackground}
        imageStyle={styles.headingImage}
      >
        <ScrollView contentContainerStyle={styles.headingContentContainer}>
          <Text style={styles.headingTitle}>Panchtantra Tales</Text>
          <Text style={styles.headingSubtitle}>STORIES</Text>
          <Text style={styles.headingDescription}>
            Enjoy timeless fables filled with wit, wisdom, and talking animals!
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={18} color="#F55" style={{ marginRight: 5 }} />
              <Text style={styles.statText}>24,234 Favorites</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="headset-outline" size={18} color="#555" style={{ marginRight: 5 }} />
              <Text style={styles.statText}>34,234 Listening</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Main banner / info */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Panchtantra Tales</Text>
          <Text style={styles.bannerSubtitle}>STORIES</Text>
          <Text style={styles.bannerDescription}>
            Enjoy timeless fables filled with wit, wisdom, and talking animals!
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={18} color="#F55" style={{ marginRight: 5 }} />
              <Text style={styles.statText}>24,234 Favorites</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="headset-outline" size={18} color="#555" style={{ marginRight: 5 }} />
              <Text style={styles.statText}>34,234 Listening</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs: WATCH / CHALLENGE */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'watch' && styles.activeTab]}
          onPress={() => setActiveTab('watch')}
        >
          <Text style={[styles.tabText, activeTab === 'watch' && styles.activeTabText]}>
            WATCH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'challenge' && styles.activeTab]}
          onPress={() => setActiveTab('challenge')}
        >
          <Text style={[styles.tabText, activeTab === 'challenge' && styles.activeTabText]}>
            CHALLENGE
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chapter list (if watch tab is active) */}
      {activeTab === 'watch' && (
        <ScrollView style={styles.chapterList} contentContainerStyle={{ paddingBottom: 80 }}>
          {/* Chapter card 1 */}
          <TouchableOpacity
            style={styles.chapterCard}
            onPress={() => router.push('/Journey')}  // Navigate to Journey screen
          >
            <View style={styles.chapterIconContainer}>
              <Ionicons name="play-circle-outline" size={24} color="#6B4EFF" />
            </View>
            <View style={styles.chapterTextContainer}>
              <Text style={styles.chapterTitle}>The Lion</Text>
              <Text style={styles.chapterDuration}>10 MIN</Text>
            </View>
            <View style={styles.chapterPlayButton}>
              <Ionicons name="caret-forward-circle" size={24} color="#333" />
            </View>
          </TouchableOpacity>

          {/* Chapter card 2 */}
          <TouchableOpacity
            style={styles.chapterCard}
            onPress={() => router.push('/Journey')}
          >
            <View style={styles.chapterIconContainer}>
              <Ionicons name="play-circle-outline" size={24} color="#6B4EFF" />
            </View>
            <View style={styles.chapterTextContainer}>
              <Text style={styles.chapterTitle}>Mongoose and Snake</Text>
              <Text style={styles.chapterDuration}>10 MIN</Text>
            </View>
            <View style={styles.chapterPlayButton}>
              <Ionicons name="caret-forward-circle" size={24} color="#333" />
            </View>
          </TouchableOpacity>

          {/* Chapter card 3 */}
          <TouchableOpacity
            style={styles.chapterCard}
            onPress={() => router.push('/Journey')}
          >
            <View style={styles.chapterIconContainer}>
              <Ionicons name="play-circle-outline" size={24} color="#6B4EFF" />
            </View>
            <View style={styles.chapterTextContainer}>
              <Text style={styles.chapterTitle}>The Clever Crow</Text>
              <Text style={styles.chapterDuration}>10 MIN</Text>
            </View>
            <View style={styles.chapterPlayButton}>
              <Ionicons name="caret-forward-circle" size={24} color="#333" />
            </View>
          </TouchableOpacity>

          {/* Add more chapters as needed */}
        </ScrollView>
      )}

      {/* If challenge tab is active */}
      {activeTab === 'challenge' && (
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeText}>
            Challenge features coming soon!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerIconContainer: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  headingImageBackground: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
    justifyContent: 'center',
  },
  headingImage: {
    resizeMode: 'cover',
  },
  headingContentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headingSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B4EFF',
    marginBottom: 8,
  },
  headingDescription: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 10,
  },
  bannerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B4EFF',
    marginVertical: 4,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#555',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#6B4EFF',
  },
  activeTabText: {
    color: '#6B4EFF',
  },
  chapterList: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  chapterIconContainer: {
    marginRight: 12,
  },
  chapterTextContainer: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chapterDuration: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  chapterPlayButton: {
    marginLeft: 12,
  },
  challengeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeText: {
    fontSize: 16,
    color: '#999',
  },
});

export { ChaptersScreen };

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const trophyIcon = require('../assets/images/homepage/trophy-yellow.png');

const ShareScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Share</Text>

      <View style={styles.card}>
        <Image source={trophyIcon} style={styles.trophyImage} />
        <Text style={styles.title}>1 Month Streak</Text>
        <Text style={styles.subtitle}>Achieved on 25/3/2025</Text>
        <Text style={styles.by}>by</Text>
        <Text style={styles.name}>TANISH</Text>
      </View>

      <View style={styles.socialRow}>
        {['logo-facebook', 'logo-instagram', 'logo-twitter', 'logo-linkedin'].map((icon, i) => (
          <TouchableOpacity key={i} style={styles.iconWrapper}>
            <Ionicons name={icon} size={24} color="#555" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#eee',
    padding: 30,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 40,
  },
  trophyImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#777',
  },
  by: {
    fontSize: 13,
    color: '#777',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  iconWrapper: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 6,
  },
});

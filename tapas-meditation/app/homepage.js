// app/homepage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Homepage!</Text>
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Journey')}
      >
        <Text style={styles.cardTitle}>Panchtantra Stories</Text>
        <Text style={styles.cardSubtitle}>Start your learning journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#6B4EFF',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});

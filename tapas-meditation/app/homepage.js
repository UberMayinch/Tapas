
// app/homepage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Homepage!</Text>
      {/* Your additional UI components */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});


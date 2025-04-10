// ExploreScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabs from './BottomTabs';

export default function ExploreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sleep Screen</Text>
      <BottomTabs navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

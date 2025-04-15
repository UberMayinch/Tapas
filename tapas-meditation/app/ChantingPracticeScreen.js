import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAccepted } from './AcceptedContext';

export default function ChantingPracticeScreen() {
    const router = useRouter();

    const { acceptComponent } = useAccepted();

    const handleAccept = () => {
      acceptComponent('chanting');
      router.push('/Validate');
    };
  
    const handleModify = () => {
      router.push('/GuruScreen');
    };
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Pronunciation</Text>
      <Text style={styles.title}>Recitation</Text>
      <Text style={styles.sanskritText}>मनोजवं मारुततुल्यवेगं {"\n"}जितेन्द्रियं बुद्धिमतां वरिष्म्...</Text>
      <Text style={styles.transliteration}>Manojavaṁ{"\n"}mārutatulyavegaṁ{"\n"}<Text style={{ fontWeight: 'bold' }}>jitendriyaṁ buddhimatāṁ</Text></Text>
      <TextInput style={styles.input} value="Manojavam" />
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.actionButton} onPress={handleAccept}>
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleModify}>
          <Text>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1A4A', padding: 20 },
  backButton: { marginTop: 40, marginBottom: 20 },
  header: { fontSize: 20, color: '#fff', fontWeight: '600' },
  title: { fontSize: 24, color: '#fff', fontWeight: '700', marginBottom: 20 },
  sanskritText: { fontSize: 18, color: '#ccc', textAlign: 'center', marginBottom: 10 },
  transliteration: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    width: '60%',
    backgroundColor: '#00D26A',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  }
});

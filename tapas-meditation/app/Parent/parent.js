import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';

export default function ParentScreen() {
  const [prompt, setPrompt] = useState('');
  const [source, setSource] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const books = [
    { label: 'Book 1', value: 'book1' },
    { label: 'Book 2', value: 'book2' },
    { label: 'Book 3', value: 'book3' },
    { label: 'Book 4', value: 'book4' },
    { label: 'Book 5', value: 'book5' }
  ];

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });
      
      if (result.type === 'success') {
        setPdfFile(result.name);
        Alert.alert('Success', `Selected: ${result.name}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select PDF file');
    }
  };
  
  const handleSubmit = () => {
    if (!prompt.trim()) {
      Alert.alert('Empty Prompt', 'Please enter what you would like your child to learn.');
      return;
    }
    
    // Navigate to loading screen
    router.push('/Parent/loadgen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hi Parent!</Text>
        <Text style={styles.subtitle}>What would you like your child to learn today?</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Select Source</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={pickPDF}
          >
            <Ionicons name="book" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Submit button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Generate Course</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select a Source</Text>
            <Picker
              selectedValue={source}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSource(itemValue);
                setModalVisible(false);
              }}
            >
              <Picker.Item label="Select a book" value="" />
              {books.map((book, index) => (
                <Picker.Item key={index} label={book.label} value={book.value} />
              ))}
            </Picker>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        
        {/* Display selected source if any */}
        {source && (
          <View style={styles.selectedItem}>
            <Text style={styles.selectedItemLabel}>Selected Source:</Text>
            <Text style={styles.selectedItemValue}>
              {books.find(book => book.value === source)?.label}
            </Text>
          </View>
        )}
        
        {/* Display selected PDF if any */}
        {pdfFile && (
          <View style={styles.selectedItem}>
            <Text style={styles.selectedItemLabel}>Selected PDF:</Text>
            <Text style={styles.selectedItemValue}>{pdfFile}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#EEEEEE',
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6B4EFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  iconButton: {
    backgroundColor: '#6B4EFF',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#6B4EFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalView: {
    margin: 20,
    marginTop: 'auto',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedItemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  selectedItemValue: {
    fontSize: 16,
    color: '#333',
  }
});
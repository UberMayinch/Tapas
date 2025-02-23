import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HfInference } from "@huggingface/inference";

// Example local image for the "Guru" illustration:
const guruImage = require('../assets/images/homepage/daily-challenge-bg.png');

// Initialize the Hugging Face Inference client
const client = new HfInference("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");

export default function GuruScreen() {
  // Conversation history: each message has a role and content.
  const [conversation, setConversation] = useState([
    { role: "assistant", content: "Hello! How can I help?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Reference to the ScrollView for auto-scrolling
  const scrollViewRef = useRef(null);

  // Build the prompt by concatenating conversation history.
  const buildPrompt = () => {
    return conversation.map(msg => {
      return (msg.role === "user" ? "User: " : "Assistant: ") + msg.content;
    }).join('\n');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Append the user message to the conversation.
    const updatedConversation = [...conversation, { role: "user", content: inputText }];
    setConversation(updatedConversation);
    setLoading(true);

    try {
      // Build the full prompt from conversation history.
      const prompt = updatedConversation.map(msg => {
        return (msg.role === "user" ? "User: " : "Assistant: ") + msg.content;
      }).join('\n') + "\nAssistant:";

      const response = await client.textGeneration({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          top_p: 0.9,
        },
      });
      console.log("Full response:", response);
      let assistantReply = "I'm not sure how to answer that.";
      if (Array.isArray(response) && response[0]?.generated_text) {
        assistantReply = response[0].generated_text.trim();
      } else if (response && response.generated_text) {
        assistantReply = response.generated_text.trim();
      }
      // Append the assistant reply to the conversation.
      setConversation(prev => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      console.error('Error calling API:', error);
      setConversation(prev => [...prev, { role: "assistant", content: 'Something went wrong. Please try again later.' }]);
    }
    setLoading(false);
    setInputText('');
  };

  // Auto-scroll to bottom when conversation updates.
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation]);

  // Render conversation history.
  const renderConversation = () => {
    return conversation.map((msg, index) => (
      <Text
        key={index}
        style={[
          styles.chatText,
          msg.role === "user" ? styles.userMessage : styles.assistantMessage
        ]}
      >
        {msg.role === "user" ? "User: " : "Assistant: "}
        {msg.content}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Back arrow (optional) */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>GURU PAL</Text>

      {/* Guru image */}
      <View style={styles.guruImageContainer}>
        <Image source={guruImage} style={styles.guruImage} />
      </View>

      {/* Scrollable conversation window */}
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        ref={scrollViewRef}
      >
        {renderConversation()}
        {loading && <Text style={styles.chatText}>Thinking...</Text>}
      </ScrollView>

      {/* Input row */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F174E', // Dark navy background
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  guruImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  guruImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 120, // Reserve space for input row
  },
  chatContent: {
    paddingBottom: 20,
  },
  chatText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  userMessage: {
    textAlign: 'right',
    color: '#A0E',
  },
  assistantMessage: {
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E2C7C',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  micButton: {
    backgroundColor: '#4D5EF1',
    borderRadius: 20,
    padding: 10,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#4D5EF1',
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});

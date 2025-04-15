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
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

// Example local image for the "Guru" illustration:
const guruImage = require('../assets/images/homepage/daily-challenge-bg.png');

// API endpoints
const API_URL = 'http://localhost:3000/api/guru/chat';
const STORY_API_URL = 'http://localhost:3000/api/guru/story';
const PERSONALIZED_JOURNEY_API_URL = 'http://localhost:3000/api/guru/personalized-journey';

export default function GuruScreen() {
  // Conversation history: each message has a role and content.
  const [conversation, setConversation] = useState([
    { role: "assistant", content: "Hello! I can tell you four different stories. What kind of story would you like to hear today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // New state variables for story functionality
  const [storyDescriptions, setStoryDescriptions] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showingStoryOptions, setShowingStoryOptions] = useState(false);
  
  // New state variables to track when a story is displayed and store original prompt
  const [storyDisplayed, setStoryDisplayed] = useState(false);
  const [originalPrompt, setOriginalPrompt] = useState('');
  
  // New state variables for journey exercises
  const [journeyExercises, setJourneyExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showingJourney, setShowingJourney] = useState(false); // Add missing state variable
  const [userAnswers, setUserAnswers] = useState({});
  
  // Reference to the ScrollView for auto-scrolling
  const scrollViewRef = useRef(null);

  // Function to fetch story descriptions from the server
  const fetchStoryDescriptions = async (userPrompt) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt || "Generate 4 short story descriptions",
          maxTokens: 200,
          temperature: 0.7,
          topP: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch story descriptions');
      }

      const data = await response.json();
      console.log("Story descriptions:", data);
      
      if (data && data.success && data.descriptions && Array.isArray(data.descriptions)) {
        setStoryDescriptions(data.descriptions);
        setShowingStoryOptions(true);
        return data.descriptions;
      } else {
        Alert.alert('Error', 'Could not get story options. Please try again.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching story descriptions:', error);
      Alert.alert('Error', 'Failed to connect to the Guru service. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle story selection and fetch the full story
  const handleStorySelection = async (storyIndex) => {
    setLoading(true);
    try {
      const selectedDescription = storyDescriptions[storyIndex];
      
      const response = await fetch(STORY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyChoice: selectedDescription,
          maxTokens: 500,
          temperature: 0.7,
          topP: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch full story');
      }

      const data = await response.json();
      console.log("Full story response:", data);
      
      if (data && data.success && data.detailedStory) {
        // Add the full story to the conversation
        setConversation([
          ...conversation,
          { role: "user", content: `I'd like to hear the story about: ${selectedDescription}` },
          { role: "assistant", content: data.detailedStory }
        ]);
        setShowingStoryOptions(false);
        setStoryDisplayed(true); // Set to true when a story is displayed
        setSelectedStory(data.detailedStory); // Store the selected story content
      } else {
        Alert.alert('Error', 'Could not get the full story. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching full story:', error);
      Alert.alert('Error', 'Failed to load the full story. Please try again.');
    }
    setLoading(false);
  };

  // Build the prompt by concatenating conversation history.
  const buildPrompt = () => {
    return conversation.map(msg => {
      return (msg.role === "user" ? "User: " : "Assistant: ") + msg.content;
    }).join('\n');
  };

  // Updated handler for generating a personalized journey
  const handleGenerateJourney = async () => {
    setLoading(true);
    try {
      // Add user request to conversation
      setConversation(prev => [...prev, 
        { role: "user", content: "Generate a personalized journey based on this story." }
      ]);
      
      // Validate that we have a story to send
      if (!selectedStory) {
        throw new Error('No story selected');
      }
      
      const response = await fetch(PERSONALIZED_JOURNEY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyContent: selectedStory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate personalized journey: ${response.status}`);
      }

      const data = await response.json();
      console.log("Personalized journey response:", data); // Add logging for debugging
      
      if (data && data.success && data.journeyExercises && Array.isArray(data.journeyExercises)) {
        // Store the journey exercises
        setJourneyExercises(data.journeyExercises);
        setShowingJourney(true); // Set the journey mode
        
        // Add an introduction message to the conversation with journey metadata
        setConversation(prev => [...prev, 
          { 
            role: "assistant", 
            content: `I've created a personalized journey called "${data.journeyTitle || 'Reflection Journey'}" based on the story.\n\n${data.journeyDescription || ''}\n\nThis journey consists of ${data.journeyExercises.length} reflective exercises. Let's begin with the first one:`,
            isJourneyIntro: true 
          }
        ]);
        
        // Add the first exercise directly to the conversation
        if (data.journeyExercises.length > 0) {
          setConversation(prev => [...prev, 
            { 
              role: "assistant", 
              content: `Exercise 1/${data.journeyExercises.length}: ${data.journeyExercises[0].question}`,
              isExercise: true,
              exerciseIndex: 0,
              exerciseType: data.journeyExercises[0].type
            }
          ]);
        }
        
        // Initialize empty answers object
        const initialAnswers = {};
        data.journeyExercises.forEach((exercise, index) => {
          initialAnswers[index] = '';
        });
        setUserAnswers(initialAnswers);
        setCurrentExerciseIndex(0);
        setStoryDisplayed(false); // Hide story display when journey starts
      } else {
        Alert.alert('Error', 'Could not generate personalized journey. Please try again.');
        setConversation(prev => [...prev, 
          { role: "assistant", content: "I'm sorry, I couldn't create a personalized journey at this time. Please try again." }
        ]);
      }
    } catch (error) {
      console.error('Error generating personalized journey:', error);
      Alert.alert('Error', 'Failed to generate personalized journey. Please try again.');
      setConversation(prev => [...prev, 
        { role: "assistant", content: "Sorry, there was an error creating your journey. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Update the handleExerciseAnswer function to better indicate progress
  const handleExerciseAnswer = (answer) => {
    if (!answer.trim()) {
      Alert.alert('Please Answer', 'Please provide an answer to continue on your journey.');
      return;
    }
    
    // Save the user's answer
    setUserAnswers(prev => ({
      ...prev,
      [currentExerciseIndex]: answer
    }));
    
    // Add the user's answer to the conversation
    setConversation(prev => [...prev, 
      { role: "user", content: answer }
    ]);
    
    // Move to the next exercise if available
    if (currentExerciseIndex < journeyExercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      
      // Add a positive reinforcement message with progress indication
      setConversation(prev => [...prev, 
        { 
          role: "assistant", 
          content: `Great reflection! You've completed ${currentExerciseIndex + 1} of ${journeyExercises.length} exercises. Let's continue with the next one:`,
          isJourneyProgress: true
        }
      ]);
      
      // Add the next exercise question with type information
      setConversation(prev => [...prev, 
        { 
          role: "assistant", 
          content: `Exercise ${nextIndex + 1}/${journeyExercises.length}: ${journeyExercises[nextIndex].question}`,
          isExercise: true,
          exerciseIndex: nextIndex,
          exerciseType: journeyExercises[nextIndex].type
        }
      ]);
    } else {
      // This was the last exercise, provide a summary
      finishJourney();
    }
    
    // Clear the input field
    setInputText('');
  };

  // Updated function to finish the journey and summarize
  const finishJourney = () => {
    // Create a summary of all exercises and answers
    const summary = "Thank you for completing your personalized journey! Here's a summary of your reflections:\n\n" + 
      journeyExercises.map((exercise, index) => (
        `Question: ${exercise.question}\nYour Answer: ${userAnswers[index] || 'Not answered'}`
      )).join('\n\n');
    
    // Add the summary to the conversation
    setConversation(prev => [...prev, 
      { role: "assistant", content: summary }
    ]);
    
    // Reset journey state
    setShowingJourney(false);
    setCurrentExerciseIndex(0);
  };

  // Add missing function for "Tell Me Other Stories" button
  const handleOtherStories = async () => {
    // Reset story-related states
    setStoryDisplayed(false);
    setSelectedStory(null);
    
    // Re-use the fetchStoryDescriptions function with the original prompt
    await fetchStoryDescriptions(originalPrompt);
    
    // Add a message to the conversation
    setConversation(prev => [...prev, 
      { role: "user", content: "Tell me other stories" },
      { role: "assistant", content: "Here are some other stories I can tell you. Please select one:" }
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Check if we're currently in the middle of an exercise
    const lastMessage = conversation[conversation.length - 1];
    if (lastMessage && lastMessage.isExercise) {
      handleExerciseAnswer(inputText);
      return;
    }
    
    // Store original prompt for reuse
    setOriginalPrompt(inputText);
    
    // Append the user message to the conversation.
    const updatedConversation = [...conversation, { role: "user", content: inputText }];
    setConversation(updatedConversation);
    setLoading(true);
    setShowingStoryOptions(false);
    setStoryDisplayed(false); // Reset story displayed state

    try {
      // Use the user's input as the prompt
      const prompt = inputText;
      
      // Fetch story descriptions based on user prompt
      const descriptions = await fetchStoryDescriptions(prompt);
      
      // Extract the assistant's reply from the response
      let assistantReply = "I'm not sure how to answer that.";
      
      if (descriptions && descriptions.length > 0) {
        assistantReply = "Here are some stories I can tell you. Please select one:";
      }

      // Append the assistant reply to the conversation.
      setConversation(prev => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      console.error('Error calling API:', error);
      setConversation(prev => [...prev, { role: "assistant", content: 'Something went wrong. Please try again later.' }]);
      Alert.alert('Error', 'Failed to connect to the Guru service. Please try again.');
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  // Auto-scroll to bottom when conversation updates.
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation, storyDescriptions]);

  // Render conversation history.
  const renderConversation = () => {
    return conversation.map((msg, index) => (
      <View 
        key={index} 
        style={[
          styles.messageContainer,
          msg.role === "user" ? styles.userMessageContainer : styles.assistantMessageContainer
        ]}
      >
        <Text
          style={[
            styles.chatText,
            msg.role === "user" ? styles.userMessage : styles.assistantMessage,
            msg.isExercise && styles.exerciseMessage,
            msg.isJourneyIntro && styles.journeyIntroMessage,
            msg.isJourneyProgress && styles.journeyProgressMessage
          ]}
        >
          {msg.role === "user" ? "User: " : "Assistant: "}
          {msg.content}
        </Text>
        
        {/* Show exercise type badge if applicable */}
        {msg.exerciseType && (
          <View style={styles.exerciseTypeBadge}>
            <Text style={styles.exerciseTypeBadgeText}>{msg.exerciseType}</Text>
          </View>
        )}
      </View>
    ));
  };

  // Render story options
  const renderStoryOptions = () => {
    if (!showingStoryOptions || storyDescriptions.length === 0) {
      return null;
    }

    return (
      <View style={styles.storyOptionsContainer}>
        {storyDescriptions.map((description, index) => (
          <TouchableOpacity
            key={index}
            style={styles.storyOption}
            onPress={() => handleStorySelection(index)}
          >
            <Text style={styles.storyOptionText}>
              {index + 1}. {description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  // New function to render story action buttons
  const renderStoryActionButtons = () => {
    if (!storyDisplayed) {
      return null;
    }

    return (
      <View style={styles.storyActionsContainer}>
        <TouchableOpacity
          style={styles.storyActionButton}
          onPress={handleGenerateJourney}
          disabled={loading}
        >
          <Text style={styles.storyActionButtonText}>Generate Personalized Journey</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.storyActionButton}
          onPress={handleOtherStories}
          disabled={loading}
        >
          <Text style={styles.storyActionButtonText}>Tell Me Other Stories</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {/* Header config */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/yourTargetScreen')}>
              <Text style={{ marginRight: 15, color: '#007AFF', fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
          ),
          title: 'Guru Screen',
        }}
      />
  
      {/* Main UI */}
      <View style={styles.container}>
        {/* Back arrow */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
  
        {/* Title */}
        <Text style={styles.title}>GURU PAL</Text>
  
        {/* Guru image */}
        <View style={styles.guruImageContainer}>
          <Image source={guruImage} style={styles.guruImage} />
        </View>
        <TouchableOpacity onPress={() => router.push('/Validate')}>
              <Text style={{ marginRight: 15, color: '#007AFF', fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
  
        {/* Chat */}
        <ScrollView 
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          ref={scrollViewRef}
        >
          {renderConversation()}
          {!showingJourney && (
            <>
              {renderStoryOptions()}
              {renderStoryActionButtons()}
            </>
          )}
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
            placeholder={conversation[conversation.length - 1]?.isExercise ? "Type your response..." : "Ask me anything..."}
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSendMessage}
            disabled={loading}
          >

          
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
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
  storyOptionsContainer: {
    marginVertical: 10,
  },
  storyOption: {
    backgroundColor: '#1E2C7C',
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#4D5EF1',
  },
  storyOptionText: {
    color: '#FFF',
    fontSize: 16,
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
  storyActionsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  storyActionButton: {
    backgroundColor: '#1E2C7C',
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#4D5EF1',
    alignItems: 'center',
  },
  storyActionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseMessage: {
    backgroundColor: '#1E2C7C',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4D5EF1',
    marginVertical: 8,
  },
  messageContainer: {
    marginVertical: 4,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  assistantMessageContainer: {
    alignItems: 'flex-start',
  },
  journeyIntroMessage: {
    backgroundColor: '#2A387B',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5D6EFF',
    marginVertical: 8,
  },
  journeyProgressMessage: {
    backgroundColor: '#323D81',
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
  },
  exerciseTypeBadge: {
    backgroundColor: '#5D6EFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  exerciseTypeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

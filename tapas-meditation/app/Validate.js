// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router'; // or useNavigation from React Navigation

// const CustomComponent = ({ icon, label, selected, onPress }) => (
//   <TouchableOpacity style={styles.componentRow} onPress={onPress}>
//     <View style={styles.iconCircle}>
//       <Ionicons name={icon} size={24} color="#fff" />
//     </View>
//     <Text style={styles.componentLabel}>{label}</Text>
//     <View style={[styles.radioCircle, selected && styles.radioSelected]} />
//   </TouchableOpacity>
// );

// export default function Validate () {
//   const [selectedComponent, setSelectedComponent] = useState('one');
//   const router = useRouter(); // or useNavigation()

//   const handlePress = (component) => {
//     setSelectedComponent(component);
//     if (component === 'one') {
//       router.push('/VideoMaterialScreen'); // or navigation.navigate('VideoMaterialScreen')
//     }
//     if (component === 'four') {
//       router.push('/ChantingPracticeScreen');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.title}>STORY CREATION</Text>
//       <Text style={styles.subtitle}>The Sage's Journey</Text>

//       <CustomComponent
//       icon="videocam"
//       label="Video Material"
//       selected={selectedComponent === 'one'}
//       onPress={() => handlePress('one')}
//     />

//       <CustomComponent
//         icon="book"
//         label="Scripture Reading"
//         selected={selectedComponent === 'two'}
//         onPress={() => setSelectedComponent('two')}
//       />

//       <CustomComponent
//         icon="school"
//         label="Wisdom Quiz"
//         selected={selectedComponent === 'three'}
//         onPress={() => setSelectedComponent('three')}
//       />

//       <CustomComponent
//         icon="mic"
//         label="Chanting Practice"
//         selected={selectedComponent === 'four'}
//         onPress={() => handlePress('four')}
//       />
//     </View>
//   );
// };

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {useAccepted} from './AcceptedContext'

const CustomComponent = ({ icon, label, accepted, onPress }) => (
  <TouchableOpacity style={styles.componentRow} onPress={onPress}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.componentLabel}>{label}</Text>
    <View style={[styles.radioCircle, accepted && styles.radioSelected]} />
  </TouchableOpacity>
);

export default function Validate() {
//   const [acceptedComponents, setAcceptedComponents] = useState({
//     video: false,
//     chanting: false,

//   });

const { acceptedComponents } = useAccepted();

// const goTo = (screen) => router.push(`/${screen}`);

  const router = useRouter();
  const params = useLocalSearchParams();

  // Update acceptance if navigated back with params


  const goTo = (screen) => router.push(`/${screen}`);
  const allAccepted = acceptedComponents.video && acceptedComponents.chanting;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>STORY CREATION</Text>
      <Text style={styles.subtitle}>The Sage's Journey</Text>

      <CustomComponent
        icon="videocam"
        label="Video Material"
        accepted={acceptedComponents.video}
        onPress={() => goTo('VideoMaterialScreen')}
      />
      <CustomComponent
        icon="book"
        label="Scripture Reading"
        accepted={true}
        onPress={() => {}}
      />
      <CustomComponent
        icon="school"
        label="Wisdom Quiz"
        accepted={true}
        onPress={() => {}}
      />
      <CustomComponent
        icon="mic"
        label="Chanting Practice"
        accepted={acceptedComponents.chanting}
        onPress={() => goTo('ChantingPracticeScreen')}
      />
{/* 
      <CustomComponent
        icon="videocam"
        label="Video Material"
        accepted={acceptedComponents.video}
        onPress={() => goTo('VideoMaterialScreen')}
      />
      <CustomComponent
        icon="book"
        label="Scripture Reading"
        accepted={true}
        onPress={() => {}}
      />
      <CustomComponent
        icon="school"
        label="Wisdom Quiz"
        accepted={true}
        onPress={() => {}}
      />
      <CustomComponent
        icon="mic"
        label="Chanting Practice"
        accepted={acceptedComponents.chanting}
        onPress={() => goTo('ChantingPracticeScreen')}
      /> */}
            {allAccepted && (
  <TouchableOpacity style={styles.doneButton} onPress={() => router.push('/homepage')}>
  <Text style={styles.doneButtonText}>Done</Text>
</TouchableOpacity>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1A4A',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 30,
  },
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconCircle: {
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    padding: 12,
    marginRight: 15,
  },
  componentLabel: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#00D26A',
    borderColor: '#00D26A',
  },
  doneButton: {
    marginTop: 40,
    backgroundColor: '#00D26A',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

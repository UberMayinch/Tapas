// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import BottomTabs from './BottomTabs';
// import { router } from 'expo-router';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* Main content in a ScrollView */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
        
//         {/* Top section: App name and greeting */}
//         <Text style={styles.appTitle}>Tapas</Text>
//         <Text style={styles.greeting}>Good Morning, Tanish</Text>
//         <Text style={styles.subGreeting}>We Wish you have a good day</Text>
        
//         {/* Row with two large cards */}
//         <View style={styles.cardRow}>
//           {/* Left card: Continue PanchTantra */}
//           <TouchableOpacity 
//             style={styles.card} 
//             onPress={() => navigation.navigate('JourneyScreen')}
//           >
//             <Image 
//               source={{ uri: 'https://via.placeholder.com/80' }} 
//               style={styles.cardImage} 
//             />
//             <Text style={styles.cardTitle}>Continue</Text>
//             <Text style={styles.cardSubtitle}>PanchTantra</Text>
//             <Text style={styles.cardSubtitle}>Chapter 1</Text>
//             <View style={styles.startButton}>
//               <Text style={styles.startButtonText}>Start</Text>
//             </View>
//           </TouchableOpacity>

//           {/* Right card: Daily Challenge */}
//           <View style={styles.card}>
//             <Image 
//               source={{ uri: 'https://via.placeholder.com/80' }} 
//               style={styles.cardImage} 
//             />
//             <Text style={styles.cardTitle}>Daily Challenge</Text>
//             <Text style={styles.cardSubtitle}>Game</Text>
//             <Text style={styles.cardSubtitle}>2 Rewards</Text>
//             <TouchableOpacity style={styles.startButton}>
//               <Text style={styles.startButtonText}>Start</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Shloka Practice Card */}
//         <View style={styles.shlokaCard}>
//           <Text style={styles.shlokaTitle}>Shloka Practice</Text>
//           <Text style={styles.shlokaSubtitle}>Meditation - 3-10 MIN</Text>
//         </View>

//         {/* Recommended for you */}
//         <Text style={styles.recommendedTitle}>Recommended for you</Text>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false} 
//           style={styles.horizontalScroll}
//         >
//           <View style={styles.recommendedCard}>
//             <Text style={styles.recommendedCardTitle}>PanchTantra</Text>
//             <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
//           </View>
//           <View style={styles.recommendedCard}>
//             <Text style={styles.recommendedCardTitle}>Ramayana</Text>
//             <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
//           </View>
//           <View style={styles.recommendedCard}>
//             <Text style={styles.recommendedCardTitle}>Mahabharata</Text>
//             <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
//           </View>
//           {/* Add more horizontal cards as needed */}
//         </ScrollView>
//       </ScrollView>

//       {/* Bottom Tabs (reusable component) */}
//       <BottomTabs navigation={navigation} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 80, // Leave space for bottom tabs
//   },
//   appTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   subGreeting: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   card: {
//     width: '48%',
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 12,
//     alignItems: 'center',
//   },
//   cardImage: {
//     width: 80,
//     height: 80,
//     marginBottom: 10,
//     resizeMode: 'contain',
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: '#777',
//   },
//   startButton: {
//     marginTop: 10,
//     backgroundColor: '#FFD700',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 5,
//   },
//   startButtonText: {
//     fontWeight: '600',
//     color: '#000',
//   },
//   shlokaCard: {
//     backgroundColor: '#EEE',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//   },
//   shlokaTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   shlokaSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   recommendedTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   horizontalScroll: {
//     marginBottom: 20,
//   },
//   recommendedCard: {
//     width: 130,
//     height: 100,
//     backgroundColor: '#F6F6F6',
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 10,
//     justifyContent: 'center',
//   },
//   recommendedCardTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   recommendedCardSubtitle: {
//     fontSize: 12,
//     color: '#777',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomTabs from './BottomTabs';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Main content in a ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top section: App name and greeting */}
        <Text style={styles.appTitle}>Tapas</Text>
        <Text style={styles.greeting}>Good Morning, Tanish</Text>
        <Text style={styles.subGreeting}>We Wish you have a good day</Text>
        
        {/* Row with two large cards */}
        <View style={styles.cardRow}>
          {/* Left card: Continue PanchTantra */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push('/Journey')}
          >
            <Image 
              source={{ uri: 'https://via.placeholder.com/80' }} 
              style={styles.cardImage} 
            />
            <Text style={styles.cardTitle}>Continue</Text>
            <Text style={styles.cardSubtitle}>PanchTantra</Text>
            <Text style={styles.cardSubtitle}>Chapter 1</Text>
            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </View>
          </TouchableOpacity>

          {/* Right card: Daily Challenge */}
          <View style={styles.card}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/80' }} 
              style={styles.cardImage} 
            />
            <Text style={styles.cardTitle}>Daily Challenge</Text>
            <Text style={styles.cardSubtitle}>Game</Text>
            <Text style={styles.cardSubtitle}>2 Rewards</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shloka Practice Card */}
        <View style={styles.shlokaCard}>
          <Text style={styles.shlokaTitle}>Shloka Practice</Text>
          <Text style={styles.shlokaSubtitle}>Meditation - 3-10 MIN</Text>
        </View>

        {/* Recommended for you */}
        <Text style={styles.recommendedTitle}>Recommended for you</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll}
        >
          <View style={styles.recommendedCard}>
            <Text style={styles.recommendedCardTitle}>PanchTantra</Text>
            <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
          </View>
          <View style={styles.recommendedCard}>
            <Text style={styles.recommendedCardTitle}>Ramayana</Text>
            <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
          </View>
          <View style={styles.recommendedCard}>
            <Text style={styles.recommendedCardTitle}>Mahabharata</Text>
            <Text style={styles.recommendedCardSubtitle}>Meditation - 3-10 min</Text>
          </View>
          {/* Add more horizontal cards as needed */}
        </ScrollView>
      </ScrollView>

      {/* Bottom Tabs (reusable component) */}
      <BottomTabs />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 80, // Leave space for bottom tabs
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  startButton: {
    marginTop: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  startButtonText: {
    fontWeight: '600',
    color: '#000',
  },
  shlokaCard: {
    backgroundColor: '#EEE',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  shlokaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shlokaSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  recommendedCard: {
    width: 130,
    height: 100,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  recommendedCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendedCardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
});

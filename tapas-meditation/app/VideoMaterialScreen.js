// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';
// // import { useAccepted } from './AcceptedContext';
// // import { Video, ResizeMode } from 'expo-av';
// // import { useRef, useState } from 'react';


// // export default function VideoMaterialScreen() {
// //     const router = useRouter();
// //     // const handleAccept = () => {
// //     //     router.push({ pathname: '/Validate', params: { accepted: 'video' } });
// //     //   };
    
// //     //   const handleModify = () => {
// //     //     router.push('/GuruScreen');
// //     //   };
// //         const { acceptComponent } = useAccepted();
    
// //         const handleAccept = () => {
// //           acceptComponent('video');
// //           router.push('/Validate');
// //         };
      
// //         const handleModify = () => {
// //           router.push('/GuruScreen');
// //         };
    
// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity style={styles.backButton}>
// //         <Ionicons name="arrow-back" size={24} color="#fff" />
// //       </TouchableOpacity>
// //       <Text style={styles.header}>Video Material</Text>
// //       <View style={styles.videoPlaceholder} />
// //       <Text style={styles.title}>The Warrior's Tale</Text>
// //       <View style={styles.controls}>
// //         <Ionicons name="play-back" size={24} color="#fff" />
// //         <Ionicons name="pause" size={40} color="#fff" />
// //         <Ionicons name="play-forward" size={24} color="#fff" />
// //       </View>
// //       <Text style={styles.subtitles}>Subtitles</Text>
// //       <Text style={styles.subtitleText}>
// //         It's not many of us, we smile at each other{"\n"}
// //         <Text style={{ fontWeight: 'bold' }}>But how many honest? Trust issues</Text>
// //       </Text>
// //       <View style={styles.buttonRow}>
// //              <TouchableOpacity style={styles.actionButton} onPress={handleAccept}>
// //                  <Text>Accept</Text>
// //                </TouchableOpacity>
// //                <TouchableOpacity style={styles.actionButton} onPress={handleModify}>
// //                  <Text>Modify</Text>
// //                </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#0D1A4A', padding: 20 },
// //   backButton: { marginTop: 40, marginBottom: 20 },
// //   header: { color: '#fff', fontSize: 20, fontWeight: '600' },
// //   // align videoPlaceholder to center and width of 80% and height of 50%
// //   videoPlaceholder: {
// //     height: 350,
// //     width: '80%',
// //     backgroundColor: '#90CAF9',
// //     alignSelf: 'center',
// //     marginVertical: 20,
// //   },
// //   title: { fontSize: 22, color: '#fff', fontWeight: '700', textAlign: 'center' },
// //   controls: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
// //   subtitles: { color: '#fff', textAlign: 'center', fontWeight: '600' },
// //   subtitleText: { color: '#ccc', textAlign: 'center', marginVertical: 10 },
// //   buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
// //   actionButton: {
// //     backgroundColor: '#fff',
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     borderRadius: 20,
// //   }
// // });
// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { useAccepted } from './AcceptedContext';
// import { Video, ResizeMode } from 'expo-av';

// export default function VideoMaterialScreen() {
//   const router = useRouter();
//   const { acceptComponent } = useAccepted();

//   const videoRef = useRef(null);
//   const [status, setStatus] = useState({});

//   const handleAccept = () => {
//     acceptComponent('video');
//     router.push('/Validate');
//   };

//   const handleModify = () => {
//     router.push('/GuruScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.header}>Video Material</Text>

//       <Video
//         ref={videoRef}
//         style={styles.video}
//         source={{
//           uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with your actual video URL
//         }}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />

//       <Text style={styles.title}>The Warrior's Tale</Text>

//       <View style={styles.controls}>
//         <TouchableOpacity onPress={() => videoRef.current?.setPositionAsync(0)}>
//           <Ionicons name="play-back" size={24} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() =>
//             status.isPlaying
//               ? videoRef.current.pauseAsync()
//               : videoRef.current.playAsync()
//           }
//         >
//           <Ionicons name={status.isPlaying ? 'pause' : 'play'} size={40} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() =>
//             videoRef.current?.playFromPositionAsync(status.positionMillis + 5000)
//           }
//         >
//           <Ionicons name="play-forward" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.subtitles}>Subtitles</Text>
//       <Text style={styles.subtitleText}>
//         It's not many of us, we smile at each other{"\n"}
//         <Text style={{ fontWeight: 'bold' }}>But how many honest? Trust issues</Text>
//       </Text>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.actionButton} onPress={handleAccept}>
//           <Text>Accept</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton} onPress={handleModify}>
//           <Text>Modify</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0D1A4A', padding: 20 },
//   backButton: { marginTop: 40, marginBottom: 20 },
//   header: { color: '#fff', fontSize: 20, fontWeight: '600' },
//   video: {
//     alignSelf: 'center',
//     width: '90%',
//     height: 350,
//     borderRadius: 10,
//     backgroundColor: '#000',
//     marginVertical: 20,
//   },
//   title: { fontSize: 22, color: '#fff', fontWeight: '700', textAlign: 'center' },
//   controls: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
//   subtitles: { color: '#fff', textAlign: 'center', fontWeight: '600' },
//   subtitleText: { color: '#ccc', textAlign: 'center', marginVertical: 10 },
//   buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
//   actionButton: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//   }
// });

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAccepted } from './AcceptedContext';
import { Video, ResizeMode } from 'expo-av';

export default function VideoMaterialScreen() {
  const router = useRouter();
  const { acceptComponent } = useAccepted();

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const handleAccept = () => {
    acceptComponent('video');
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

      <Text style={styles.header}>Video Material</Text>

      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{
            uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with your actual video URL
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>

      <Text style={styles.title}>The Warrior's Tale</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => videoRef.current?.setPositionAsync(0)}>
          <Ionicons name="play-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            status.isPlaying
              ? videoRef.current.pauseAsync()
              : videoRef.current.playAsync()
          }
        >
          <Ionicons name={status.isPlaying ? 'pause' : 'play'} size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            videoRef.current?.playFromPositionAsync(status.positionMillis + 5000)
          }
        >
          <Ionicons name="play-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitles}>Subtitles</Text>
      <Text style={styles.subtitleText}>
        It's not many of us, we smile at each other{"\n"}
        <Text style={{ fontWeight: 'bold' }}>But how many honest? Trust issues</Text>
      </Text>

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
  header: { color: '#fff', fontSize: 20, fontWeight: '600' },

  videoWrapper: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#000', // to remove flash on load
  },
  video: {
    width: '100%',
    height: '100%',
  },

  title: { fontSize: 22, color: '#fff', fontWeight: '700', textAlign: 'center' },
  controls: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  subtitles: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  subtitleText: { color: '#ccc', textAlign: 'center', marginVertical: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  actionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

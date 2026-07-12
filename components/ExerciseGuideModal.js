import { useState } from 'react';
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import VideoPlayer from './VideoPlayer';

export default function ExerciseGuideModal({ exercise, onClose, onLogStruggle }) {
  const [justLogged, setJustLogged] = useState(false);

  if (!exercise) {
    return null;
  }

  function handleStruggle() {
    onLogStruggle(exercise);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1500);
  }

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>

        <VideoPlayer videoUrl={exercise.videoUrl} />

        <TouchableOpacity onPress={() => Linking.openURL(exercise.videoUrl)}>
          <Text style={styles.openInYoutube}>Open in YouTube ↗</Text>
        </TouchableOpacity>

        <Text style={styles.description}>{exercise.description}</Text>

        <TouchableOpacity style={styles.struggleButton} onPress={handleStruggle}>
          <Text style={styles.struggleButtonText}>I'm Having Trouble with This</Text>
        </TouchableOpacity>

        {justLogged && <Text style={styles.confirmation}>Logged ✓</Text>}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  openInYoutube: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 24,
  },
  struggleButton: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  struggleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  confirmation: {
    marginTop: 12,
    textAlign: 'center',
    color: '#16a34a',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 14,
  },
  closeButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});

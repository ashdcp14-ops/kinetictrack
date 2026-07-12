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
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.target}>
          Target: {exercise.sets} sets × {exercise.reps} reps
        </Text>

        <VideoPlayer videoUrl={exercise.videoUrl} />

        <TouchableOpacity onPress={() => Linking.openURL(exercise.videoUrl)}>
          <Text style={styles.openInYoutube}>Open in YouTube ↗</Text>
        </TouchableOpacity>

        <Text style={styles.description}>{exercise.description}</Text>

        <TouchableOpacity style={styles.struggleButton} onPress={handleStruggle}>
          <Text style={styles.struggleButtonText}>I'm Having Trouble with This</Text>
        </TouchableOpacity>

        {justLogged && <Text style={styles.confirmation}>Logged ✓</Text>}
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  target: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 16,
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
});

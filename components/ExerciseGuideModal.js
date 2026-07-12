import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.title}>{exercise.name}</Text>

        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoPlaceholderText}>▶ Demo video</Text>
        </View>

        <TouchableOpacity style={styles.struggleButton} onPress={handleStruggle}>
          <Text style={styles.struggleButtonText}>I'm Having Trouble with This</Text>
        </TouchableOpacity>

        {justLogged && <Text style={styles.confirmation}>Logged ✓</Text>}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#111',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 16,
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
    marginTop: 'auto',
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 14,
  },
  closeButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});

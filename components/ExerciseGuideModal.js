import { useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from './VideoPlayer';

export default function ExerciseGuideModal({ exercise, onClose, onLogStruggle }) {
  const [justLogged, setJustLogged] = useState(false);
  const [showTroublePrompt, setShowTroublePrompt] = useState(false);
  const [troubleNote, setTroubleNote] = useState('');

  if (!exercise) {
    return null;
  }

  function finishLoggingTrouble(note) {
    onLogStruggle(exercise, note);
    setTroubleNote('');
    setShowTroublePrompt(false);
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

        {showTroublePrompt ? (
          <>
            <Text style={styles.troublePromptLabel}>What's going on? (optional)</Text>
            <TextInput
              style={styles.troubleInput}
              placeholder="E.g. sharp pinch on the 5th rep"
              value={troubleNote}
              onChangeText={setTroubleNote}
              autoFocus
              multiline
            />
            <TouchableOpacity
              style={styles.troubleSubmitButton}
              onPress={() => finishLoggingTrouble(troubleNote.trim())}
            >
              <Text style={styles.troubleSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.troubleSkipButton} onPress={() => finishLoggingTrouble('')}>
              <Text style={styles.troubleSkipButtonText}>Skip</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.struggleButton} onPress={() => setShowTroublePrompt(true)}>
            <Text style={styles.struggleButtonText}>I'm Having Trouble with This</Text>
          </TouchableOpacity>
        )}

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
  troublePromptLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  troubleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  troubleSubmitButton: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  troubleSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  troubleSkipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  troubleSkipButtonText: {
    color: '#666',
    fontSize: 14,
  },
  confirmation: {
    marginTop: 12,
    textAlign: 'center',
    color: '#16a34a',
    fontWeight: '600',
  },
});

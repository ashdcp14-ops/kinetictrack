import { useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayer from './VideoPlayer';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

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

        <View style={styles.instructionBlock}>
          <Text style={styles.instructionLabel}>Setup</Text>
          <Text style={styles.instructionText}>{exercise.setup}</Text>
        </View>

        <View style={styles.instructionBlock}>
          <Text style={styles.instructionLabel}>Execution</Text>
          {exercise.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

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
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  target: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  openInYoutube: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xl,
  },
  instructionBlock: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  instructionLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  instructionText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  stepNumber: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: SPACING.sm,
    width: 20,
  },
  stepText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  struggleButton: {
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  struggleButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    textAlign: 'center',
  },
  troublePromptLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  troubleInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: SPACING.md,
    color: COLORS.textPrimary,
  },
  troubleSubmitButton: {
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  troubleSubmitButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  troubleSkipButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  troubleSkipButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.base,
  },
  confirmation: {
    marginTop: SPACING.md,
    textAlign: 'center',
    color: COLORS.accent,
    fontWeight: '600',
  },
});

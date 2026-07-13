import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

export default function PostSetFeedbackModal({ exercise, onSubmit, onSkip }) {
  const { t, translateExercise } = useLanguage();
  const [note, setNote] = useState('');

  if (!exercise) {
    return null;
  }

  const localizedExercise = translateExercise(exercise);

  function handleSubmit() {
    const trimmed = note.trim();
    if (trimmed.length === 0) {
      onSkip();
      return;
    }
    onSubmit(trimmed);
    setNote('');
  }

  function handleSkip() {
    setNote('');
    onSkip();
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={handleSkip}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('postSetFeedback.title')}</Text>
          <Text style={styles.subtitle}>{localizedExercise.name}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('postSetFeedback.placeholder')}
            value={note}
            onChangeText={setNote}
            autoFocus
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('postSetFeedback.submit')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>{t('postSetFeedback.skip')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(35, 50, 56, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOW.raised,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
    color: COLORS.textPrimary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  skipButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
});

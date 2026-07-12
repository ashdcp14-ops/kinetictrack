import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

export default function WelcomeScreen({ onContinue }) {
  const [name, setName] = useState('');
  const [step, setStep] = useState('ask');

  function handleAskContinue() {
    if (name.trim().length === 0) {
      return;
    }
    setStep('welcome');
  }

  if (step === 'welcome') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to KineticTrack, {name.trim()}!</Text>
        <Text style={styles.subtitle}>Let's get your recovery plan set up.</Text>
        <TouchableOpacity style={styles.button} onPress={() => onContinue(name.trim())}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi there! 👋</Text>
      <Text style={styles.title}>What's your name?</Text>
      <Text style={styles.subtitle}>We'll use it to personalize your experience.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor={COLORS.textMuted}
        value={name}
        onChangeText={setName}
        autoFocus
        onSubmitEditing={handleAskContinue}
      />

      <TouchableOpacity
        style={[styles.button, name.trim().length === 0 && styles.buttonDisabled]}
        disabled={name.trim().length === 0}
        onPress={handleAskContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 21,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    ...SHADOW.card,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

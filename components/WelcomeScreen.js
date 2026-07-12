import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      <Text style={styles.title}>What's your name?</Text>
      <Text style={styles.subtitle}>We'll use it to personalize your experience.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
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
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

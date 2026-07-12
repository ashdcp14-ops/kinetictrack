import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREAS } from '../data/exercises';

export default function OnboardingScreen({ onContinue }) {
  const [selectedAreas, setSelectedAreas] = useState([]);

  function toggleArea(area) {
    setSelectedAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>What are you recovering from?</Text>
      <Text style={styles.subtitle}>
        Select your injury area to see relevant exercises.
      </Text>

      {PROBLEM_AREAS.map((area) => {
        const isSelected = selectedAreas.includes(area);
        return (
          <TouchableOpacity
            key={area}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => toggleArea(area)}
          >
            <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
              {isSelected ? '☑' : '☐'} {area}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[styles.continueButton, selectedAreas.length === 0 && styles.continueButtonDisabled]}
        disabled={selectedAreas.length === 0}
        onPress={() => onContinue(selectedAreas)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  continueButton: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PROBLEM_AREAS = ['Rodilla', 'Cadera', 'Hombro'];

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
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué estás recuperando?</Text>
      <Text style={styles.subtitle}>
        Selecciona tu zona de lesión para ver ejercicios relevantes.
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
        <Text style={styles.continueButtonText}>Continuar</Text>
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

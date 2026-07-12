import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK } from '../data/schedule';
import { PROBLEM_AREAS, getExercisesForAreas } from '../data/exercises';

export default function RoutineScheduleScreen({ onContinue }) {
  const [step, setStep] = useState('days');
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedule, setSchedule] = useState({});

  function toggleDay(day) {
    setSelectedDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
  }

  function assignCategory(day, category) {
    setSchedule((current) => ({
      ...current,
      [day]: { category, exerciseIds: [] },
    }));
  }

  function toggleExercise(day, exerciseId) {
    setSchedule((current) => {
      const dayEntry = current[day];
      const exerciseIds = dayEntry.exerciseIds.includes(exerciseId)
        ? dayEntry.exerciseIds.filter((id) => id !== exerciseId)
        : [...dayEntry.exerciseIds, exerciseId];
      return { ...current, [day]: { ...dayEntry, exerciseIds } };
    });
  }

  const orderedSelectedDays = DAYS_OF_WEEK.filter((day) => selectedDays.includes(day));
  const allDaysReady = orderedSelectedDays.every(
    (day) => schedule[day]?.category && schedule[day].exerciseIds.length > 0
  );

  function handleFinish() {
    const finalSchedule = {};
    orderedSelectedDays.forEach((day) => {
      finalSchedule[day] = schedule[day];
    });
    onContinue(finalSchedule);
  }

  if (step === 'days') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Which days will you train?</Text>
        <Text style={styles.subtitle}>Pick the days you plan to do your exercises.</Text>

        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {isSelected ? '☑' : '☐'} {day}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.continueButton, selectedDays.length === 0 && styles.continueButtonDisabled]}
          disabled={selectedDays.length === 0}
          onPress={() => setStep('categories')}
        >
          <Text style={styles.continueButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Build each day's workout</Text>
      <Text style={styles.subtitle}>
        Pick a category, then check off the exercises you'll actually do — no need to do all of them.
      </Text>

      {orderedSelectedDays.map((day) => {
        const dayEntry = schedule[day];
        const dayExercises = dayEntry ? getExercisesForAreas([dayEntry.category]) : [];

        return (
          <View key={day} style={styles.daySection}>
            <Text style={styles.dayTitle}>{day}</Text>

            {PROBLEM_AREAS.map((category) => {
              const isSelected = dayEntry?.category === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => assignCategory(day, category)}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {isSelected ? '●' : '○'} {category}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {dayEntry && (
              <View style={styles.exerciseChecklist}>
                <Text style={styles.exerciseChecklistLabel}>Which exercises?</Text>
                {dayExercises.map((exercise) => {
                  const isChecked = dayEntry.exerciseIds.includes(exercise.id);
                  return (
                    <TouchableOpacity
                      key={exercise.id}
                      style={styles.exerciseOption}
                      onPress={() => toggleExercise(day, exercise.id)}
                    >
                      <Text style={styles.exerciseOptionText}>
                        {isChecked ? '☑' : '☐'} {exercise.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={[styles.continueButton, !allDaysReady && styles.continueButtonDisabled]}
        disabled={!allDaysReady}
        onPress={handleFinish}
      >
        <Text style={styles.continueButtonText}>Save Routine</Text>
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
  daySection: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
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
  exerciseChecklist: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 14,
    marginTop: 4,
  },
  exerciseChecklistLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  exerciseOption: {
    paddingVertical: 8,
  },
  exerciseOptionText: {
    fontSize: 15,
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

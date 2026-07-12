import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK } from '../data/schedule';
import { PROBLEM_AREAS, getExercisesForAreas } from '../data/exercises';

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;
const SETS_RANGE = { min: 1, max: 10 };
const REPS_RANGE = { min: 1, max: 50 };

function Stepper({ label, value, onDecrement, onIncrement }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity style={styles.stepperButton} onPress={onDecrement}>
          <Text style={styles.stepperButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={onIncrement}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
      [day]: { category, exercises: [] },
    }));
  }

  function toggleExercise(day, exerciseId) {
    setSchedule((current) => {
      const dayEntry = current[day];
      const alreadyIncluded = dayEntry.exercises.some((exercise) => exercise.id === exerciseId);
      const exercises = alreadyIncluded
        ? dayEntry.exercises.filter((exercise) => exercise.id !== exerciseId)
        : [...dayEntry.exercises, { id: exerciseId, sets: DEFAULT_SETS, reps: DEFAULT_REPS }];
      return { ...current, [day]: { ...dayEntry, exercises } };
    });
  }

  function updateExerciseField(day, exerciseId, field, delta) {
    const range = field === 'sets' ? SETS_RANGE : REPS_RANGE;
    setSchedule((current) => {
      const dayEntry = current[day];
      const exercises = dayEntry.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }
        const newValue = Math.min(range.max, Math.max(range.min, exercise[field] + delta));
        return { ...exercise, [field]: newValue };
      });
      return { ...current, [day]: { ...dayEntry, exercises } };
    });
  }

  const orderedSelectedDays = DAYS_OF_WEEK.filter((day) => selectedDays.includes(day));
  const allDaysReady = orderedSelectedDays.every(
    (day) => schedule[day]?.category && schedule[day].exercises.length > 0
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
        Pick a category, check off the exercises you'll do, and set how many sets and reps for each.
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
                  const config = dayEntry.exercises.find((item) => item.id === exercise.id);
                  const isChecked = Boolean(config);
                  return (
                    <View key={exercise.id} style={styles.exerciseBlock}>
                      <TouchableOpacity
                        style={styles.exerciseOption}
                        onPress={() => toggleExercise(day, exercise.id)}
                      >
                        <Text style={styles.exerciseOptionText}>
                          {isChecked ? '☑' : '☐'} {exercise.name}
                        </Text>
                      </TouchableOpacity>

                      {isChecked && (
                        <View style={styles.stepperRow}>
                          <Stepper
                            label="Sets"
                            value={config.sets}
                            onDecrement={() => updateExerciseField(day, exercise.id, 'sets', -1)}
                            onIncrement={() => updateExerciseField(day, exercise.id, 'sets', 1)}
                          />
                          <Stepper
                            label="Reps"
                            value={config.reps}
                            onDecrement={() => updateExerciseField(day, exercise.id, 'reps', -1)}
                            onIncrement={() => updateExerciseField(day, exercise.id, 'reps', 1)}
                          />
                        </View>
                      )}
                    </View>
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
  exerciseBlock: {
    marginBottom: 4,
  },
  exerciseOption: {
    paddingVertical: 8,
  },
  exerciseOptionText: {
    fontSize: 15,
  },
  stepperRow: {
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 8,
  },
  stepper: {
    marginRight: 24,
  },
  stepperLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  stepperValue: {
    width: 32,
    textAlign: 'center',
    fontSize: 15,
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

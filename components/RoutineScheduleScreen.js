import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK } from '../data/schedule';
import DayScheduleEditor from './DayScheduleEditor';

export default function RoutineScheduleScreen({ onContinue }) {
  const [step, setStep] = useState('days');
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedule, setSchedule] = useState({});

  function toggleDay(day) {
    setSelectedDays((current) =>
      current.includes(day) ? current.filter((item) => item !== day) : [...current, day]
    );
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

      {orderedSelectedDays.map((day) => (
        <View key={day} style={styles.daySection}>
          <Text style={styles.dayTitle}>{day}</Text>
          <DayScheduleEditor
            daySchedule={schedule[day] ?? null}
            onChange={(updated) => setSchedule((current) => ({ ...current, [day]: updated }))}
          />
        </View>
      ))}

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

import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK } from '../data/schedule';
import DayScheduleEditor from './DayScheduleEditor';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

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
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
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
  daySection: {
    marginBottom: SPACING.xl,
  },
  dayTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  option: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    ...SHADOW.card,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.primaryBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

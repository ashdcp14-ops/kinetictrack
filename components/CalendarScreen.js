import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREA_ICONS, getExercisesForAreas } from '../data/exercises';
import MonthCalendar from './MonthCalendar';
import DayScheduleEditor from './DayScheduleEditor';

function getDayExercises(daySchedule) {
  if (!daySchedule) {
    return [];
  }
  const categoryExercises = getExercisesForAreas([daySchedule.category]);
  return daySchedule.exercises.map((config) => ({
    ...categoryExercises.find((exercise) => exercise.id === config.id),
    sets: config.sets,
    reps: config.reps,
  }));
}

export default function CalendarScreen({ visible, onClose, weeklySchedule, onUpdateDaySchedule }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [step, setStep] = useState('calendar');
  const [draftSchedule, setDraftSchedule] = useState(null);

  if (!visible) {
    return null;
  }

  function handleSelectDay(day) {
    setSelectedDay(day);
    setStep('detail');
  }

  function handleBackToCalendar() {
    setSelectedDay(null);
    setStep('calendar');
  }

  function handleStartEdit() {
    setDraftSchedule(weeklySchedule[selectedDay] ?? { category: null, exercises: [] });
    setStep('edit');
  }

  const canSaveDraft = Boolean(draftSchedule?.category) && (draftSchedule?.exercises.length ?? 0) > 0;

  function handleSave() {
    onUpdateDaySchedule(selectedDay, canSaveDraft ? draftSchedule : null);
    setSelectedDay(null);
    setStep('calendar');
  }

  function handleRemove() {
    onUpdateDaySchedule(selectedDay, null);
    setSelectedDay(null);
    setStep('calendar');
  }

  const daySchedule = selectedDay ? weeklySchedule[selectedDay] ?? null : null;

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={step === 'calendar' ? onClose : handleBackToCalendar}
        >
          <Text style={styles.backButtonText}>← {step === 'calendar' ? 'Back' : 'Calendar'}</Text>
        </TouchableOpacity>

        {step === 'calendar' && (
          <>
            <Text style={styles.title}>Calendar</Text>
            <Text style={styles.subtitle}>Tap a date to view or edit that day's workout.</Text>
            <MonthCalendar weeklySchedule={weeklySchedule} onSelectDay={handleSelectDay} />
          </>
        )}

        {step === 'detail' && (
          <>
            <Text style={styles.title}>{selectedDay}</Text>

            {daySchedule ? (
              <>
                <View style={styles.categoryRow}>
                  <Image
                    source={PROBLEM_AREA_ICONS[daySchedule.category]}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryText}>{daySchedule.category}</Text>
                </View>

                {getDayExercises(daySchedule).map((exercise) => (
                  <View key={exercise.id} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseMeta}>
                      {exercise.sets} sets × {exercise.reps} reps
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Text style={styles.restText}>No workout scheduled — rest day 🌿</Text>
            )}

            <TouchableOpacity style={styles.editButton} onPress={handleStartEdit}>
              <Text style={styles.editButtonText}>{daySchedule ? 'Edit this day' : 'Add a workout'}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 'edit' && (
          <>
            <Text style={styles.title}>Edit {selectedDay}</Text>

            <DayScheduleEditor daySchedule={draftSchedule} onChange={setDraftSchedule} />

            <TouchableOpacity
              style={[styles.saveButton, !canSaveDraft && styles.saveButtonDisabled]}
              disabled={!canSaveDraft}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>

            {daySchedule && (
              <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                <Text style={styles.removeButtonText}>Remove this day's workout</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </Modal>
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
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
  exerciseRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
  },
  exerciseName: {
    fontSize: 15,
    marginBottom: 2,
  },
  exerciseMeta: {
    fontSize: 13,
    color: '#777',
  },
  restText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  editButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  removeButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

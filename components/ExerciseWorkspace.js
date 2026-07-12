import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getExercisesForAreas } from '../data/exercises';
import ExerciseGuideModal from './ExerciseGuideModal';
import PostSetFeedbackModal from './PostSetFeedbackModal';
import ReminderSettings from './ReminderSettings';
import ClinicDashboard from './ClinicDashboard';

export default function ExerciseWorkspace({
  problemAreas,
  onLogStruggle,
  onLogFeedback,
  struggleLogs,
  postSetNotes,
}) {
  const exercises = getExercisesForAreas(problemAreas);
  const [completedIds, setCompletedIds] = useState([]);
  const [activeExercise, setActiveExercise] = useState(null);
  const [feedbackExercise, setFeedbackExercise] = useState(null);
  const [reminderSettingsVisible, setReminderSettingsVisible] = useState(false);
  const [clinicDashboardVisible, setClinicDashboardVisible] = useState(false);

  function toggleCompleted(exercise) {
    const isNowCompleted = !completedIds.includes(exercise.id);
    setCompletedIds((current) =>
      isNowCompleted ? [...current, exercise.id] : current.filter((item) => item !== exercise.id)
    );
    if (isNowCompleted) {
      setFeedbackExercise(exercise);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Routine</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.bellButton} onPress={() => setClinicDashboardVisible(true)}>
            <Text style={styles.bellButtonText}>📋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellButton} onPress={() => setReminderSettingsVisible(true)}>
            <Text style={styles.bellButtonText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {exercises.map((exercise) => {
        const isCompleted = completedIds.includes(exercise.id);
        return (
          <View key={exercise.id} style={styles.row}>
            <TouchableOpacity style={styles.checkArea} onPress={() => toggleCompleted(exercise)}>
              <Text style={styles.checkbox}>{isCompleted ? '☑' : '☐'}</Text>
              <Text style={[styles.exerciseName, isCompleted && styles.exerciseNameDone]}>
                {exercise.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={() => setActiveExercise(exercise)}>
              <Text style={styles.playButtonText}>▶ Watch video</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <ExerciseGuideModal
        exercise={activeExercise}
        onClose={() => setActiveExercise(null)}
        onLogStruggle={onLogStruggle}
      />

      <PostSetFeedbackModal
        exercise={feedbackExercise}
        onSubmit={(note) => {
          onLogFeedback(feedbackExercise, note);
          setFeedbackExercise(null);
        }}
        onSkip={() => setFeedbackExercise(null)}
      />

      <ReminderSettings
        visible={reminderSettingsVisible}
        onClose={() => setReminderSettingsVisible(false)}
      />

      <ClinicDashboard
        visible={clinicDashboardVisible}
        onClose={() => setClinicDashboardVisible(false)}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  bellButton: {
    padding: 8,
  },
  bellButtonText: {
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  checkArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 16,
    flexShrink: 1,
  },
  exerciseNameDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  playButton: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

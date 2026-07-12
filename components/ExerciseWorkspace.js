import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getExercisesForAreas } from '../data/exercises';
import { getTodayName } from '../data/schedule';
import ExerciseGuideModal from './ExerciseGuideModal';
import PostSetFeedbackModal from './PostSetFeedbackModal';
import ReminderSettings from './ReminderSettings';
import ClinicDashboard from './ClinicDashboard';
import WeekDayStrip from './WeekDayStrip';
import DayCompleteModal from './DayCompleteModal';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';
import { getDayCompletion, getProgressColor } from '../utils/progress';

export default function ExerciseWorkspace({
  userName,
  weeklySchedule,
  onLogStruggle,
  onLogFeedback,
  struggleLogs,
  postSetNotes,
  onChangeSchedule,
}) {
  const [selectedDay, setSelectedDay] = useState(getTodayName());
  const daySchedule = weeklySchedule[selectedDay] ?? null;
  const exercises = daySchedule
    ? getExercisesForAreas([daySchedule.category]).filter((exercise) =>
        daySchedule.exerciseIds.includes(exercise.id)
      )
    : [];
  const [completedIds, setCompletedIds] = useState([]);
  const [hasLoadedCompletedIds, setHasLoadedCompletedIds] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const [feedbackExercise, setFeedbackExercise] = useState(null);
  const [reminderSettingsVisible, setReminderSettingsVisible] = useState(false);
  const [clinicDashboardVisible, setClinicDashboardVisible] = useState(false);
  const [dayCompleteModalVisible, setDayCompleteModalVisible] = useState(false);

  useEffect(() => {
    loadJSON(STORAGE_KEYS.COMPLETED_IDS, []).then((saved) => {
      setCompletedIds(saved);
      setHasLoadedCompletedIds(true);
    });
  }, []);

  useEffect(() => {
    if (hasLoadedCompletedIds) {
      saveJSON(STORAGE_KEYS.COMPLETED_IDS, completedIds);
    }
  }, [completedIds, hasLoadedCompletedIds]);

  function toggleCompleted(exercise) {
    const isNowCompleted = !completedIds.includes(exercise.id);
    setCompletedIds((current) =>
      isNowCompleted ? [...current, exercise.id] : current.filter((item) => item !== exercise.id)
    );
    if (isNowCompleted) {
      setFeedbackExercise(exercise);
    }
  }

  function checkDayCompletion() {
    if (
      daySchedule &&
      daySchedule.exerciseIds.length > 0 &&
      daySchedule.exerciseIds.every((id) => completedIds.includes(id))
    ) {
      setDayCompleteModalVisible(true);
    }
  }

  const isToday = selectedDay === getTodayName();
  const { percent, doneCount, total } = getDayCompletion(daySchedule, completedIds);
  const dayExerciseIds = daySchedule?.exerciseIds ?? [];
  const dayStruggleEntries = struggleLogs.filter((entry) => dayExerciseIds.includes(entry.exerciseId));
  const dayNoteEntries = postSetNotes.filter((entry) => dayExerciseIds.includes(entry.exerciseId));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hi, {userName} 👋</Text>
      <View style={styles.header}>
        <Text style={styles.title}>{isToday ? "Today's Routine" : `${selectedDay}'s Routine`}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.bellButton} onPress={() => setClinicDashboardVisible(true)}>
            <Text style={styles.bellButtonText}>📋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellButton} onPress={() => setReminderSettingsVisible(true)}>
            <Text style={styles.bellButtonText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <WeekDayStrip
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        weeklySchedule={weeklySchedule}
        completedIds={completedIds}
      />

      <TouchableOpacity onPress={onChangeSchedule}>
        <Text style={styles.changeAreasLink}>Edit my routine</Text>
      </TouchableOpacity>

      {daySchedule ? (
        <>
          <Text style={styles.todayCategory}>{daySchedule.category}</Text>
          <View style={styles.dayProgressRow}>
            <View style={styles.dayProgressTrack}>
              <View
                style={[
                  styles.dayProgressFill,
                  { width: `${Math.round(percent * 100)}%`, backgroundColor: getProgressColor(percent) },
                ]}
              />
            </View>
            <Text style={styles.dayProgressLabel}>
              {doneCount}/{total}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.restDay}>
          {isToday
            ? 'No workout scheduled today — rest day 🌿'
            : `No workout scheduled for ${selectedDay} — rest day 🌿`}
        </Text>
      )}

      {exercises.map((exercise) => {
        const isCompleted = completedIds.includes(exercise.id);
        return (
          <View key={exercise.id} style={styles.row}>
            <TouchableOpacity style={styles.checkboxArea} onPress={() => toggleCompleted(exercise)}>
              <Text style={styles.checkbox}>{isCompleted ? '☑' : '☐'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameArea} onPress={() => setActiveExercise(exercise)}>
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
          checkDayCompletion();
        }}
        onSkip={() => {
          setFeedbackExercise(null);
          checkDayCompletion();
        }}
      />

      <DayCompleteModal
        visible={dayCompleteModalVisible}
        onClose={() => setDayCompleteModalVisible(false)}
        dayName={selectedDay}
        struggleEntries={dayStruggleEntries}
        noteEntries={dayNoteEntries}
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
  greeting: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
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
  changeAreasLink: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 20,
  },
  todayCategory: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  dayProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayProgressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
    overflow: 'hidden',
    marginRight: 10,
  },
  dayProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  dayProgressLabel: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  restDay: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
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
  checkboxArea: {
    paddingRight: 10,
  },
  checkbox: {
    fontSize: 18,
  },
  nameArea: {
    flex: 1,
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

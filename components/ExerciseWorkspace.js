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
import ProfileScreen from './ProfileScreen';
import CalendarScreen from './CalendarScreen';
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
  onUpdateDaySchedule,
}) {
  const [selectedDay, setSelectedDayState] = useState(getTodayName());
  const daySchedule = weeklySchedule[selectedDay] ?? null;
  const categoryExercises = daySchedule ? getExercisesForAreas([daySchedule.category]) : [];
  const exercises = daySchedule
    ? daySchedule.exercises.map((config) => ({
        ...categoryExercises.find((exercise) => exercise.id === config.id),
        sets: config.sets,
        reps: config.reps,
      }))
    : [];
  const [completedByDay, setCompletedByDay] = useState({});
  const [hasLoadedCompletedIds, setHasLoadedCompletedIds] = useState(false);
  const completedSetsForSelectedDay = completedByDay[selectedDay] ?? {};
  const [activeExercise, setActiveExercise] = useState(null);
  const [feedbackExercise, setFeedbackExercise] = useState(null);
  const [reminderSettingsVisible, setReminderSettingsVisible] = useState(false);
  const [clinicDashboardVisible, setClinicDashboardVisible] = useState(false);
  const [dayCompleteModalVisible, setDayCompleteModalVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  function setSelectedDay(day) {
    setSelectedDayState(day);
    setDayCompleteModalVisible(false);
  }

  useEffect(() => {
    loadJSON(STORAGE_KEYS.COMPLETED_BY_DAY, {}).then((saved) => {
      setCompletedByDay(saved);
      setHasLoadedCompletedIds(true);
    });
  }, []);

  useEffect(() => {
    if (hasLoadedCompletedIds) {
      saveJSON(STORAGE_KEYS.COMPLETED_BY_DAY, completedByDay);
    }
  }, [completedByDay, hasLoadedCompletedIds]);

  function logSet(exercise) {
    const doneSets = completedSetsForSelectedDay[exercise.id] ?? 0;
    if (doneSets >= exercise.sets) {
      return;
    }
    const newDoneSets = doneSets + 1;
    setCompletedByDay((current) => ({
      ...current,
      [selectedDay]: { ...(current[selectedDay] ?? {}), [exercise.id]: newDoneSets },
    }));
    if (newDoneSets === exercise.sets) {
      setFeedbackExercise(exercise);
    }
  }

  function undoSet(exercise) {
    const doneSets = completedSetsForSelectedDay[exercise.id] ?? 0;
    if (doneSets <= 0) {
      return;
    }
    setCompletedByDay((current) => ({
      ...current,
      [selectedDay]: { ...(current[selectedDay] ?? {}), [exercise.id]: doneSets - 1 },
    }));
  }

  function checkDayCompletion() {
    const currentSets = completedByDay[selectedDay] ?? {};
    if (
      daySchedule &&
      daySchedule.exercises.length > 0 &&
      daySchedule.exercises.every((exercise) => (currentSets[exercise.id] ?? 0) >= exercise.sets)
    ) {
      setDayCompleteModalVisible(true);
    }
  }

  const isToday = selectedDay === getTodayName();
  const { percent, doneCount, total } = getDayCompletion(daySchedule, completedSetsForSelectedDay);
  const dayExerciseIds = daySchedule?.exercises?.map((exercise) => exercise.id) ?? [];
  const dayStruggleEntries = struggleLogs.filter((entry) => dayExerciseIds.includes(entry.exerciseId));
  const dayNoteEntries = postSetNotes.filter((entry) => dayExerciseIds.includes(entry.exerciseId));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.greetingButton} onPress={() => setProfileVisible(true)}>
        <View style={styles.profileIconCircle}>
          <Text style={styles.profileIcon}>👤</Text>
        </View>
        <Text style={styles.greeting}>Hi, {userName} 👋 ›</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>{isToday ? "Today's Routine" : `${selectedDay}'s Routine`}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.bellButton} onPress={() => setCalendarVisible(true)}>
            <Text style={styles.bellButtonText}>📅</Text>
          </TouchableOpacity>
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
        completedByDay={completedByDay}
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
              {doneCount}/{total} sets
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
        const doneSets = completedSetsForSelectedDay[exercise.id] ?? 0;
        const isFullyDone = doneSets >= exercise.sets;
        return (
          <View key={exercise.id} style={styles.row}>
            <View style={styles.rowTop}>
              <TouchableOpacity style={styles.nameArea} onPress={() => setActiveExercise(exercise)}>
                <Text style={[styles.exerciseName, isFullyDone && styles.exerciseNameDone]}>
                  {exercise.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton} onPress={() => setActiveExercise(exercise)}>
                <Text style={styles.playButtonText}>▶ Watch video</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.setsRow}>
              <View style={styles.setsDots}>
                {Array.from({ length: exercise.sets }).map((_, index) => (
                  <Text key={index} style={styles.setDot}>
                    {index < doneSets ? '●' : '○'}
                  </Text>
                ))}
              </View>
              <Text style={styles.setsLabel}>
                {doneSets}/{exercise.sets} sets · {exercise.reps} reps
              </Text>
              <View style={styles.setsButtons}>
                <TouchableOpacity
                  style={[styles.logSetButton, isFullyDone && styles.setsButtonDisabled]}
                  disabled={isFullyDone}
                  onPress={() => logSet(exercise)}
                >
                  <Text style={styles.logSetButtonText}>+ Log Set</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.undoButton, doneSets === 0 && styles.setsButtonDisabled]}
                  disabled={doneSets === 0}
                  onPress={() => undoSet(exercise)}
                >
                  <Text style={styles.undoButtonText}>↺</Text>
                </TouchableOpacity>
              </View>
            </View>
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

      <ProfileScreen
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
        userName={userName}
        weeklySchedule={weeklySchedule}
        completedByDay={completedByDay}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
        onViewClinicDashboard={() => {
          setProfileVisible(false);
          setClinicDashboardVisible(true);
        }}
        onViewCalendar={() => {
          setProfileVisible(false);
          setCalendarVisible(true);
        }}
      />

      <CalendarScreen
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        weeklySchedule={weeklySchedule}
        onUpdateDaySchedule={onUpdateDaySchedule}
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
  greetingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  profileIcon: {
    fontSize: 14,
  },
  greeting: {
    fontSize: 14,
    color: '#555',
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
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  setsRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  setsDots: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  setDot: {
    fontSize: 16,
    color: '#2563eb',
    marginRight: 4,
  },
  setsLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  setsButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logSetButton: {
    backgroundColor: '#16a34a',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  logSetButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  undoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoButtonText: {
    fontSize: 15,
    color: '#555',
  },
  setsButtonDisabled: {
    opacity: 0.4,
  },
});

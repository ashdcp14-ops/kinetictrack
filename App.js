import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import RoutineScheduleScreen from './components/RoutineScheduleScreen';
import ExerciseWorkspace from './components/ExerciseWorkspace';
import ErrorBoundary from './components/ErrorBoundary';
import { loadJSON, saveJSON, removeItem, STORAGE_KEYS } from './utils/storage';

function migrateWeeklySchedule(schedule) {
  if (!schedule) {
    return { schedule, didMigrate: false };
  }
  let didMigrate = false;
  const migrated = {};
  for (const day of Object.keys(schedule)) {
    const entry = schedule[day];
    if (!entry.exercises && entry.exerciseIds) {
      didMigrate = true;
      migrated[day] = {
        category: entry.category,
        exercises: entry.exerciseIds.map((id) => ({ id, sets: 3, reps: 10 })),
      };
    } else {
      migrated[day] = entry;
    }
  }
  return { schedule: migrated, didMigrate };
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [weeklySchedule, setWeeklySchedule] = useState(null);
  const [struggleLogs, setStruggleLogs] = useState([]);
  const [postSetNotes, setPostSetNotes] = useState([]);

  useEffect(() => {
    async function loadPersistedState() {
      const [savedName, savedSchedule, savedStruggleLogs, savedPostSetNotes] = await Promise.all([
        loadJSON(STORAGE_KEYS.USER_NAME, null),
        loadJSON(STORAGE_KEYS.WEEKLY_SCHEDULE, null),
        loadJSON(STORAGE_KEYS.STRUGGLE_LOGS, []),
        loadJSON(STORAGE_KEYS.POST_SET_NOTES, []),
      ]);
      const { schedule: migratedSchedule, didMigrate } = migrateWeeklySchedule(savedSchedule);
      if (didMigrate) {
        saveJSON(STORAGE_KEYS.WEEKLY_SCHEDULE, migratedSchedule);
      }
      setUserName(savedName);
      setWeeklySchedule(migratedSchedule);
      setStruggleLogs(savedStruggleLogs);
      setPostSetNotes(savedPostSetNotes);
      setIsLoading(false);
    }
    loadPersistedState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveJSON(STORAGE_KEYS.STRUGGLE_LOGS, struggleLogs);
    }
  }, [struggleLogs, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveJSON(STORAGE_KEYS.POST_SET_NOTES, postSetNotes);
    }
  }, [postSetNotes, isLoading]);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  function selectUserName(name) {
    setUserName(name);
    saveJSON(STORAGE_KEYS.USER_NAME, name);
  }

  function selectWeeklySchedule(schedule) {
    setWeeklySchedule(schedule);
    saveJSON(STORAGE_KEYS.WEEKLY_SCHEDULE, schedule);
  }

  function resetWeeklySchedule() {
    setWeeklySchedule(null);
    removeItem(STORAGE_KEYS.WEEKLY_SCHEDULE);
  }

  function updateDaySchedule(day, newDaySchedule) {
    setWeeklySchedule((current) => {
      const updated = { ...current };
      if (newDaySchedule) {
        updated[day] = newDaySchedule;
      } else {
        delete updated[day];
      }
      saveJSON(STORAGE_KEYS.WEEKLY_SCHEDULE, updated);
      return updated;
    });
  }

  if (!userName) {
    return <WelcomeScreen onContinue={selectUserName} />;
  }

  if (!weeklySchedule) {
    return <RoutineScheduleScreen onContinue={selectWeeklySchedule} />;
  }

  function logStruggle(exercise, note) {
    setStruggleLogs((current) => [
      ...current,
      {
        id: `${exercise.id}-${Date.now()}`,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        note: note && note.length > 0 ? note : undefined,
        timestamp: Date.now(),
      },
    ]);
  }

  function logFeedback(exercise, note) {
    setPostSetNotes((current) => [
      ...current,
      { id: `${exercise.id}-${Date.now()}`, exerciseId: exercise.id, exerciseName: exercise.name, note, timestamp: Date.now() },
    ]);
  }

  return (
    <>
      <ExerciseWorkspace
        userName={userName}
        weeklySchedule={weeklySchedule}
        onLogStruggle={logStruggle}
        onLogFeedback={logFeedback}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
        onChangeSchedule={resetWeeklySchedule}
        onUpdateDaySchedule={updateDaySchedule}
      />
      <StatusBar style="auto" />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

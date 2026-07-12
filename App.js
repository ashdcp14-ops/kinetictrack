import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import RoutineScheduleScreen from './components/RoutineScheduleScreen';
import ExerciseWorkspace from './components/ExerciseWorkspace';
import { getTodayName } from './data/schedule';
import { loadJSON, saveJSON, removeItem, STORAGE_KEYS } from './utils/storage';

export default function App() {
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
      setUserName(savedName);
      setWeeklySchedule(savedSchedule);
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

  if (!userName) {
    return <WelcomeScreen onContinue={selectUserName} />;
  }

  if (!weeklySchedule) {
    return <RoutineScheduleScreen onContinue={selectWeeklySchedule} />;
  }

  function logStruggle(exercise) {
    setStruggleLogs((current) => [
      ...current,
      { id: `${exercise.id}-${Date.now()}`, exerciseId: exercise.id, exerciseName: exercise.name, timestamp: Date.now() },
    ]);
  }

  function logFeedback(exercise, note) {
    setPostSetNotes((current) => [
      ...current,
      { id: `${exercise.id}-${Date.now()}`, exerciseId: exercise.id, exerciseName: exercise.name, note, timestamp: Date.now() },
    ]);
  }

  const todayCategory = weeklySchedule[getTodayName()] ?? null;

  return (
    <>
      <ExerciseWorkspace
        userName={userName}
        todayCategory={todayCategory}
        onLogStruggle={logStruggle}
        onLogFeedback={logFeedback}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
        onChangeSchedule={resetWeeklySchedule}
      />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import OnboardingScreen from './components/OnboardingScreen';
import ExerciseWorkspace from './components/ExerciseWorkspace';
import { loadJSON, saveJSON, removeItem, STORAGE_KEYS } from './utils/storage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [problemAreas, setProblemAreas] = useState(null);
  const [struggleLogs, setStruggleLogs] = useState([]);
  const [postSetNotes, setPostSetNotes] = useState([]);

  useEffect(() => {
    async function loadPersistedState() {
      const [savedAreas, savedStruggleLogs, savedPostSetNotes] = await Promise.all([
        loadJSON(STORAGE_KEYS.PROBLEM_AREAS, null),
        loadJSON(STORAGE_KEYS.STRUGGLE_LOGS, []),
        loadJSON(STORAGE_KEYS.POST_SET_NOTES, []),
      ]);
      setProblemAreas(savedAreas);
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

  function selectProblemAreas(areas) {
    setProblemAreas(areas);
    saveJSON(STORAGE_KEYS.PROBLEM_AREAS, areas);
  }

  function resetProblemAreas() {
    setProblemAreas(null);
    removeItem(STORAGE_KEYS.PROBLEM_AREAS);
  }

  if (!problemAreas) {
    return <OnboardingScreen onContinue={selectProblemAreas} />;
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

  return (
    <>
      <ExerciseWorkspace
        problemAreas={problemAreas}
        onLogStruggle={logStruggle}
        onLogFeedback={logFeedback}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
        onChangeAreas={resetProblemAreas}
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

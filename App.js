import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './components/OnboardingScreen';
import ExerciseWorkspace from './components/ExerciseWorkspace';

export default function App() {
  const [problemAreas, setProblemAreas] = useState(null);
  const [struggleLogs, setStruggleLogs] = useState([]);

  if (!problemAreas) {
    return <OnboardingScreen onContinue={setProblemAreas} />;
  }

  function logStruggle(exercise) {
    setStruggleLogs((current) => [
      ...current,
      { id: `${exercise.id}-${Date.now()}`, exerciseId: exercise.id, exerciseName: exercise.name, timestamp: Date.now() },
    ]);
  }

  return (
    <>
      <ExerciseWorkspace problemAreas={problemAreas} onLogStruggle={logStruggle} />
      <StatusBar style="auto" />
    </>
  );
}

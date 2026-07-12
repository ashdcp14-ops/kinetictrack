import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './components/OnboardingScreen';
import ExerciseWorkspace from './components/ExerciseWorkspace';

export default function App() {
  const [problemAreas, setProblemAreas] = useState(null);

  if (!problemAreas) {
    return <OnboardingScreen onContinue={setProblemAreas} />;
  }

  return (
    <>
      <ExerciseWorkspace problemAreas={problemAreas} />
      <StatusBar style="auto" />
    </>
  );
}

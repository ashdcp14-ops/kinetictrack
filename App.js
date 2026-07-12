import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnboardingScreen from './components/OnboardingScreen';

export default function App() {
  const [problemAreas, setProblemAreas] = useState(null);

  if (!problemAreas) {
    return <OnboardingScreen onContinue={setProblemAreas} />;
  }

  return (
    <View style={styles.container}>
      <Text>Zonas seleccionadas: {problemAreas.join(', ')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

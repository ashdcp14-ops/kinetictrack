import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getExercisesForAreas } from '../data/exercises';

export default function ExerciseWorkspace({ problemAreas }) {
  const exercises = getExercisesForAreas(problemAreas);
  const [completedIds, setCompletedIds] = useState([]);

  function toggleCompleted(id) {
    setCompletedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function playDemoVideo(exerciseName) {
    // Reproducción real de video llegará en un PR futuro (biblioteca de video).
    Alert.alert('Video de demostración', exerciseName);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Rutina de hoy</Text>

      {exercises.map((exercise) => {
        const isCompleted = completedIds.includes(exercise.id);
        return (
          <View key={exercise.id} style={styles.row}>
            <TouchableOpacity style={styles.checkArea} onPress={() => toggleCompleted(exercise.id)}>
              <Text style={styles.checkbox}>{isCompleted ? '☑' : '☐'}</Text>
              <Text style={[styles.exerciseName, isCompleted && styles.exerciseNameDone]}>
                {exercise.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={() => playDemoVideo(exercise.name)}>
              <Text style={styles.playButtonText}>▶ Ver video</Text>
            </TouchableOpacity>
          </View>
        );
      })}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

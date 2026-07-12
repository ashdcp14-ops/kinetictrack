import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREA_ICONS } from '../data/exercises';

export default function DayDetailModal({ visible, onClose, dayName, daySchedule, exercises }) {
  if (!visible) {
    return null;
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
          <Text style={styles.title}>{dayName}</Text>

          {daySchedule ? (
            <>
              <View style={styles.categoryRow}>
                <Image
                  source={PROBLEM_AREA_ICONS[daySchedule.category]}
                  style={styles.categoryIcon}
                  resizeMode="contain"
                />
                <Text style={styles.categoryText}>{daySchedule.category}</Text>
              </View>

              {exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseMeta}>
                    {exercise.sets} sets × {exercise.reps} reps
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.restText}>No workout scheduled — rest day 🌿</Text>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    maxHeight: '80%',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
  exerciseRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
  },
  exerciseName: {
    fontSize: 15,
    marginBottom: 2,
  },
  exerciseMeta: {
    fontSize: 13,
    color: '#777',
  },
  restText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

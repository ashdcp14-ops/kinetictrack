import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DayCompleteModal({ visible, onClose, dayName, struggleEntries, noteEntries }) {
  if (!visible) {
    return null;
  }

  const hasNothingToReport = struggleEntries.length === 0 && noteEntries.length === 0;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Great job!</Text>
          <Text style={styles.subtitle}>You completed {dayName}'s routine.</Text>

          {hasNothingToReport ? (
            <Text style={styles.emptyState}>No trouble flags or notes today — smooth session!</Text>
          ) : (
            <>
              {struggleEntries.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>⚠ Trouble reported</Text>
                  {struggleEntries.map((entry) => (
                    <Text key={entry.id} style={styles.entryText}>
                      • {entry.exerciseName}
                      {entry.note ? `: "${entry.note}"` : ''}
                    </Text>
                  ))}
                </View>
              )}

              {noteEntries.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📝 Notes</Text>
                  {noteEntries.map((entry) => (
                    <Text key={entry.id} style={styles.entryText}>
                      • {entry.exerciseName}: "{entry.note}"
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Done</Text>
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
    padding: 24,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyState: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 6,
  },
  entryText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

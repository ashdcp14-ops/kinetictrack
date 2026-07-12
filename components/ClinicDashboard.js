import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function buildTimeline(struggleLogs, postSetNotes) {
  const struggleEntries = struggleLogs.map((log) => ({
    id: log.id,
    exerciseName: log.exerciseName,
    timestamp: log.timestamp,
    type: 'struggle',
  }));
  const noteEntries = postSetNotes.map((entry) => ({
    id: entry.id,
    exerciseName: entry.exerciseName,
    timestamp: entry.timestamp,
    type: 'note',
    note: entry.note,
  }));
  return [...struggleEntries, ...noteEntries].sort((a, b) => b.timestamp - a.timestamp);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
  const dateLabel = date.toLocaleDateString();
  const timeLabel = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${weekday}, ${dateLabel} · ${timeLabel}`;
}

export default function ClinicDashboard({ visible, onClose, struggleLogs, postSetNotes }) {
  if (!visible) {
    return null;
  }

  const timeline = buildTimeline(struggleLogs, postSetNotes);

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Clinic Timeline</Text>
        <Text style={styles.subtitle}>
          Only exercises flagged as difficult or with a pain note appear here.
        </Text>

        {timeline.length === 0 && (
          <Text style={styles.emptyState}>No flagged exercises yet.</Text>
        )}

        {timeline.map((entry) => (
          <View
            key={entry.id}
            style={[styles.entry, entry.type === 'struggle' ? styles.entryStruggle : styles.entryNote]}
          >
            <Text style={styles.entryHeader}>
              {entry.type === 'struggle' ? '⚠ Trouble reported' : '📝 Pain note'}
            </Text>
            <Text style={styles.entryExercise}>{entry.exerciseName}</Text>
            {entry.note && <Text style={styles.entryNoteText}>"{entry.note}"</Text>}
            <Text style={styles.entryTimestamp}>{formatTimestamp(entry.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>
    </Modal>
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  emptyState: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  entry: {
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
  entryStruggle: {
    borderLeftColor: '#dc2626',
  },
  entryNote: {
    borderLeftColor: '#2563eb',
  },
  entryHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginBottom: 4,
  },
  entryExercise: {
    fontSize: 16,
    fontWeight: '600',
  },
  entryNoteText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginTop: 4,
  },
  entryTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});

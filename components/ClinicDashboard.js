import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

function buildTimeline(struggleLogs, postSetNotes) {
  const struggleEntries = struggleLogs.map((log) => ({
    id: log.id,
    exerciseName: log.exerciseName,
    timestamp: log.timestamp,
    type: 'struggle',
    note: log.note,
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
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  emptyState: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  entry: {
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  entryStruggle: {
    borderLeftColor: COLORS.danger,
  },
  entryNote: {
    borderLeftColor: COLORS.primary,
  },
  entryHeader: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  entryExercise: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  entryNoteText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  entryTimestamp: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
});

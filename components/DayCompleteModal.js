import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

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
    backgroundColor: 'rgba(35, 50, 56, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  card: {
    maxHeight: '80%',
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    ...SHADOW.raised,
  },
  cardContent: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  emptyState: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
  },
  section: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  entryText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  closeButton: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

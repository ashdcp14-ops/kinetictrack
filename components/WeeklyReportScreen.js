import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCurrentWeekRange, buildWeeklyReportText, formatDateLabel } from '../utils/report';
import ExportButton from './ExportButton';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

export default function WeeklyReportScreen({ visible, onClose, userName, struggleLogs, postSetNotes }) {
  if (!visible) {
    return null;
  }

  const { start, end } = getCurrentWeekRange();
  const reportText = buildWeeklyReportText({ userName, struggleLogs, postSetNotes });

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Weekly Report</Text>
        <Text style={styles.subtitle}>
          {formatDateLabel(start)} – {formatDateLabel(end)}
        </Text>
        <Text style={styles.helperText}>
          Share this with your physical therapist — it only covers this week so far.
        </Text>

        <View style={styles.previewBox}>
          <Text style={styles.previewText}>{reportText}</Text>
        </View>

        <ExportButton reportText={reportText} />
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
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  helperText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  previewBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  previewText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});

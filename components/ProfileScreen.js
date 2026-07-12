import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTodayName } from '../data/schedule';
import { getDayCompletion, getWeekCompletion, getProgressColor } from '../utils/progress';
import WeeklyReportScreen from './WeeklyReportScreen';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

function ProgressCard({ label, stats }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(stats.percent * 100)}%`, backgroundColor: getProgressColor(stats.percent) },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {stats.doneCount}/{stats.total}
        </Text>
      </View>
    </View>
  );
}

export default function ProfileScreen({
  visible,
  onClose,
  userName,
  weeklySchedule,
  completedByDay,
  struggleLogs,
  postSetNotes,
  onViewClinicDashboard,
  onViewCalendar,
  onSwitchUser,
}) {
  const [weeklyReportVisible, setWeeklyReportVisible] = useState(false);
  const [confirmingSwitch, setConfirmingSwitch] = useState(false);

  if (!visible) {
    return null;
  }

  const todayName = getTodayName();
  const todaySchedule = weeklySchedule[todayName] ?? null;
  const todayStats = getDayCompletion(todaySchedule, completedByDay[todayName] ?? {});
  const weekStats = getWeekCompletion(weeklySchedule, completedByDay);

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.greeting}>Hi, {userName} 👋</Text>

        <ProgressCard label="Today's progress" stats={todayStats} />
        <ProgressCard label="This week's progress" stats={weekStats} />

        <TouchableOpacity style={styles.calendarButton} onPress={onViewCalendar}>
          <Text style={styles.calendarButtonText}>📅 View calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clinicButton} onPress={onViewClinicDashboard}>
          <Text style={styles.clinicButtonText}>📋 View my comments &amp; flags</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => setWeeklyReportVisible(true)}>
          <Text style={styles.reportButtonText}>📄 Weekly report for my PT</Text>
        </TouchableOpacity>

        {confirmingSwitch ? (
          <View style={styles.switchConfirmBox}>
            <Text style={styles.switchConfirmText}>
              Switching users will erase {userName}'s routine, progress, and history on this
              device. This can't be undone.
            </Text>
            <TouchableOpacity style={styles.switchConfirmButton} onPress={onSwitchUser}>
              <Text style={styles.switchConfirmButtonText}>Yes, switch user</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.switchCancelButton}
              onPress={() => setConfirmingSwitch(false)}
            >
              <Text style={styles.switchCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.switchUserButton} onPress={() => setConfirmingSwitch(true)}>
            <Text style={styles.switchUserButtonText}>🔄 Switch user</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <WeeklyReportScreen
        visible={weeklyReportVisible}
        onClose={() => setWeeklyReportVisible(false)}
        userName={userName}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
      />
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
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  cardLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceMuted,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.sm,
  },
  progressLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  calendarButton: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  clinicButton: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    ...SHADOW.card,
  },
  clinicButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  reportButton: {
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  reportButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  switchUserButton: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  switchUserButtonText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  switchConfirmBox: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.dangerLight,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
  },
  switchConfirmText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  switchConfirmButton: {
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  switchConfirmButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  switchCancelButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  switchCancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTodayName } from '../data/schedule';
import { getDayCompletion, getWeekCompletion, getProgressColor } from '../utils/progress';
import WeeklyReportScreen from './WeeklyReportScreen';
import BottomNavBar from './BottomNavBar';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW, CATEGORY_PALETTE } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

function ProgressCard({ label, stats, accent }) {
  return (
    <View style={[styles.card, { backgroundColor: accent.bg }]}>
      <Text style={[styles.cardLabel, { color: accent.text }]}>{label}</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(stats.percent * 100)}%`, backgroundColor: getProgressColor(stats.percent) },
            ]}
          />
        </View>
        <Text style={[styles.progressLabel, { color: accent.text }]}>
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
  onViewReminders,
  onSwitchUser,
  activeTab,
  onNavigate,
}) {
  const { t } = useLanguage();
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
    <View style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>{t('profile.back')}</Text>
        </TouchableOpacity>

        <Text style={styles.greeting}>{t('profile.greeting', userName)}</Text>

        <ProgressCard label={t('profile.todaysProgress')} stats={todayStats} accent={CATEGORY_PALETTE[0]} />
        <ProgressCard label={t('profile.weekProgress')} stats={weekStats} accent={CATEGORY_PALETTE[2]} />

        <TouchableOpacity style={styles.calendarButton} onPress={onViewCalendar}>
          <Text style={styles.calendarButtonText}>{t('profile.viewCalendar')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clinicButton} onPress={onViewClinicDashboard}>
          <Text style={styles.clinicButtonText}>{t('profile.viewComments')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => setWeeklyReportVisible(true)}>
          <Text style={styles.reportButtonText}>{t('profile.weeklyReport')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={onViewReminders}>
          <Text style={styles.reportButtonText}>{t('profile.reminderSettings')}</Text>
        </TouchableOpacity>

        {confirmingSwitch ? (
          <View style={styles.switchConfirmBox}>
            <Text style={styles.switchConfirmText}>{t('profile.switchConfirm', userName)}</Text>
            <TouchableOpacity style={styles.switchConfirmButton} onPress={onSwitchUser}>
              <Text style={styles.switchConfirmButtonText}>{t('profile.yesSwitch')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.switchCancelButton}
              onPress={() => setConfirmingSwitch(false)}
            >
              <Text style={styles.switchCancelButtonText}>{t('profile.cancel')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.switchUserButton} onPress={() => setConfirmingSwitch(true)}>
            <Text style={styles.switchUserButtonText}>{t('profile.switchUser')}</Text>
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
      <BottomNavBar activeTab={activeTab} onNavigate={onNavigate} />
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: 100,
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

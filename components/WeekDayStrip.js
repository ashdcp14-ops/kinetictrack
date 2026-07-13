import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK, getTodayName } from '../data/schedule';
import { getDayCompletion, getProgressColor } from '../utils/progress';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

export default function WeekDayStrip({ selectedDay, onSelectDay, weeklySchedule, completedByDay }) {
  const { t, translateDayAbbr } = useLanguage();
  const todayName = getTodayName();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {DAYS_OF_WEEK.map((day) => {
        const isSelected = day === selectedDay;
        const isToday = day === todayName;
        const daySchedule = weeklySchedule[day];
        const { percent } = getDayCompletion(daySchedule, completedByDay[day] ?? {});

        return (
          <TouchableOpacity
            key={day}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectDay(day)}
          >
            <Text style={[styles.pillDay, isSelected && styles.pillDaySelected]}>
              {translateDayAbbr(day)}
            </Text>
            {daySchedule ? (
              <View style={[styles.progressTrack, isSelected && styles.progressTrackSelected]}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.round(percent * 100)}%`, backgroundColor: getProgressColor(percent) },
                  ]}
                />
              </View>
            ) : (
              <Text style={[styles.restLabel, isSelected && styles.restLabelSelected]}>
                {t('weekDayStrip.rest')}
              </Text>
            )}
            {isToday && (
              <Text style={[styles.todayLabel, isSelected && styles.todayLabelSelected]}>
                {t('weekDayStrip.today')}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  content: {
    gap: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  pill: {
    width: 56,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  pillSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  pillDay: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  pillDaySelected: {
    color: COLORS.white,
  },
  progressTrack: {
    marginTop: SPACING.sm,
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.surfaceMuted,
    overflow: 'hidden',
  },
  progressTrackSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  restLabel: {
    marginTop: SPACING.xs + 2,
    fontSize: FONT_SIZES.xs - 2,
    color: COLORS.textMuted,
  },
  restLabelSelected: {
    color: COLORS.primaryLight,
  },
  todayLabel: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.xs - 3,
    color: COLORS.primary,
    fontWeight: '600',
  },
  todayLabelSelected: {
    color: COLORS.primaryLight,
  },
});

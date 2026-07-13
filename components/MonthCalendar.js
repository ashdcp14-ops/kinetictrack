import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREA_ICONS } from '../data/exercises';
import { COLORS, SPACING, FONT_SIZES } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function MonthCalendar({ weeklySchedule, onSelectDay }) {
  const { monthNames, weekdayLetters } = useLanguage();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekdayOfMonth; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.monthLabel}>
        {monthNames[month]} {year}
      </Text>

      <View style={styles.weekdayRow}>
        {weekdayLetters.map((label, index) => (
          <Text key={index} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.cell} />;
          }
          const weekdayName = WEEKDAY_NAMES[new Date(year, month, day).getDay()];
          const daySchedule = weeklySchedule[weekdayName];
          const isToday = day === todayDate;

          return (
            <TouchableOpacity
              key={day}
              style={styles.cell}
              onPress={() => onSelectDay(weekdayName)}
            >
              <View style={[styles.dateCircle, isToday && styles.dateCircleToday]}>
                <Text style={[styles.dateText, isToday && styles.dateTextToday]}>{day}</Text>
              </View>
              {daySchedule ? (
                <Image
                  source={PROBLEM_AREA_ICONS[daySchedule.category]}
                  style={styles.routineIcon}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.routineIconPlaceholder} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const CELL_WIDTH = `${100 / 7}%`;

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
  },
  monthLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  weekdayLabel: {
    width: CELL_WIDTH,
    textAlign: 'center',
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: CELL_WIDTH,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleToday: {
    backgroundColor: COLORS.primary,
  },
  dateText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  dateTextToday: {
    color: COLORS.white,
    fontWeight: '700',
  },
  routineIcon: {
    marginTop: 2,
    width: 16,
    height: 16,
  },
  routineIconPlaceholder: {
    marginTop: 2,
    width: 16,
    height: 16,
  },
});

import { StyleSheet, Text, View } from 'react-native';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function MonthCalendar({ weeklySchedule }) {
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
        {MONTH_NAMES[month]} {year}
      </Text>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label, index) => (
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
          const hasRoutine = Boolean(weeklySchedule[weekdayName]);
          const isToday = day === todayDate;

          return (
            <View key={day} style={styles.cell}>
              <View style={[styles.dateCircle, isToday && styles.dateCircleToday]}>
                <Text style={[styles.dateText, isToday && styles.dateTextToday]}>{day}</Text>
              </View>
              {hasRoutine && <View style={[styles.routineDot, isToday && styles.routineDotToday]} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const CELL_WIDTH = `${100 / 7}%`;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayLabel: {
    width: CELL_WIDTH,
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: CELL_WIDTH,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleToday: {
    backgroundColor: '#2563eb',
  },
  dateText: {
    fontSize: 13,
    color: '#333',
  },
  dateTextToday: {
    color: '#fff',
    fontWeight: '700',
  },
  routineDot: {
    marginTop: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2563eb',
  },
  routineDotToday: {
    backgroundColor: '#93c5fd',
  },
});

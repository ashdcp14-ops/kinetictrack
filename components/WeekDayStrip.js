import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK, DAY_ABBREVIATIONS, getTodayName } from '../data/schedule';

export default function WeekDayStrip({ selectedDay, onSelectDay, weeklySchedule }) {
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
        const hasRoutine = Boolean(weeklySchedule[day]);

        return (
          <TouchableOpacity
            key={day}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectDay(day)}
          >
            <Text style={[styles.pillDay, isSelected && styles.pillDaySelected]}>
              {DAY_ABBREVIATIONS[day]}
            </Text>
            {hasRoutine ? (
              <View style={[styles.routineDot, isSelected && styles.routineDotSelected]} />
            ) : (
              <Text style={[styles.restLabel, isSelected && styles.restLabelSelected]}>rest</Text>
            )}
            {isToday && <Text style={[styles.todayLabel, isSelected && styles.todayLabelSelected]}>today</Text>}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    gap: 8,
    paddingRight: 8,
  },
  pill: {
    width: 56,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignItems: 'center',
  },
  pillSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  pillDay: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  pillDaySelected: {
    color: '#fff',
  },
  routineDot: {
    marginTop: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563eb',
  },
  routineDotSelected: {
    backgroundColor: '#fff',
  },
  restLabel: {
    marginTop: 6,
    fontSize: 10,
    color: '#999',
  },
  restLabelSelected: {
    color: '#dbeafe',
  },
  todayLabel: {
    marginTop: 4,
    fontSize: 9,
    color: '#2563eb',
    fontWeight: '600',
  },
  todayLabelSelected: {
    color: '#dbeafe',
  },
});

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS_OF_WEEK, DAY_ABBREVIATIONS, getTodayName } from '../data/schedule';
import { getDayCompletion, getProgressColor } from '../utils/progress';

export default function WeekDayStrip({ selectedDay, onSelectDay, weeklySchedule, completedByDay }) {
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
        const { percent } = getDayCompletion(daySchedule, completedByDay[day] ?? []);

        return (
          <TouchableOpacity
            key={day}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectDay(day)}
          >
            <Text style={[styles.pillDay, isSelected && styles.pillDaySelected]}>
              {DAY_ABBREVIATIONS[day]}
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
  progressTrack: {
    marginTop: 8,
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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

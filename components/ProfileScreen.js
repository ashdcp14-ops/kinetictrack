import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTodayName } from '../data/schedule';
import { getExercisesForAreas } from '../data/exercises';
import { getDayCompletion, getWeekCompletion, getProgressColor } from '../utils/progress';
import MonthCalendar from './MonthCalendar';
import DayDetailModal from './DayDetailModal';
import WeeklyReportScreen from './WeeklyReportScreen';

function getDayExercises(daySchedule) {
  if (!daySchedule) {
    return [];
  }
  const categoryExercises = getExercisesForAreas([daySchedule.category]);
  return daySchedule.exercises.map((config) => ({
    ...categoryExercises.find((exercise) => exercise.id === config.id),
    sets: config.sets,
    reps: config.reps,
  }));
}

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
}) {
  const [weeklyReportVisible, setWeeklyReportVisible] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);

  if (!visible) {
    return null;
  }

  const todayName = getTodayName();
  const todaySchedule = weeklySchedule[todayName] ?? null;
  const todayStats = getDayCompletion(todaySchedule, completedByDay[todayName] ?? {});
  const weekStats = getWeekCompletion(weeklySchedule, completedByDay);
  const selectedDaySchedule = selectedCalendarDay ? weeklySchedule[selectedCalendarDay] ?? null : null;

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.greeting}>Hi, {userName} 👋</Text>

        <ProgressCard label="Today's progress" stats={todayStats} />
        <ProgressCard label="This week's progress" stats={weekStats} />

        <View style={styles.card}>
          <MonthCalendar weeklySchedule={weeklySchedule} onSelectDay={setSelectedCalendarDay} />
        </View>

        <TouchableOpacity style={styles.clinicButton} onPress={onViewClinicDashboard}>
          <Text style={styles.clinicButtonText}>📋 View my comments &amp; flags</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton} onPress={() => setWeeklyReportVisible(true)}>
          <Text style={styles.reportButtonText}>📄 Weekly report for my PT</Text>
        </TouchableOpacity>
      </ScrollView>

      <WeeklyReportScreen
        visible={weeklyReportVisible}
        onClose={() => setWeeklyReportVisible(false)}
        userName={userName}
        struggleLogs={struggleLogs}
        postSetNotes={postSetNotes}
      />

      <DayDetailModal
        visible={Boolean(selectedCalendarDay)}
        onClose={() => setSelectedCalendarDay(null)}
        dayName={selectedCalendarDay}
        daySchedule={selectedDaySchedule}
        exercises={getDayExercises(selectedDaySchedule)}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  clinicButton: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  clinicButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  reportButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
});

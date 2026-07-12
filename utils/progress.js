export function getDayCompletion(daySchedule, dayCompletedSets) {
  if (!daySchedule || daySchedule.exercises.length === 0) {
    return { percent: 0, doneCount: 0, total: 0 };
  }
  const total = daySchedule.exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const doneCount = daySchedule.exercises.reduce((sum, exercise) => {
    const done = Math.min(dayCompletedSets[exercise.id] ?? 0, exercise.sets);
    return sum + done;
  }, 0);
  return { percent: total === 0 ? 0 : doneCount / total, doneCount, total };
}

export function getWeekCompletion(weeklySchedule, completedByDay) {
  const days = Object.keys(weeklySchedule);
  const total = days.reduce(
    (sum, day) => sum + weeklySchedule[day].exercises.reduce((s, exercise) => s + exercise.sets, 0),
    0
  );
  if (total === 0) {
    return { percent: 0, doneCount: 0, total: 0 };
  }
  const doneCount = days.reduce((sum, day) => {
    const dayCompletedSets = completedByDay[day] ?? {};
    return (
      sum +
      weeklySchedule[day].exercises.reduce((s, exercise) => {
        const done = Math.min(dayCompletedSets[exercise.id] ?? 0, exercise.sets);
        return s + done;
      }, 0)
    );
  }, 0);
  return { percent: doneCount / total, doneCount, total };
}

export { getProgressColor } from './theme';

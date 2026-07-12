export function getDayCompletion(daySchedule, completedIds) {
  if (!daySchedule || daySchedule.exerciseIds.length === 0) {
    return { percent: 0, doneCount: 0, total: 0 };
  }
  const total = daySchedule.exerciseIds.length;
  const doneCount = daySchedule.exerciseIds.filter((id) => completedIds.includes(id)).length;
  return { percent: doneCount / total, doneCount, total };
}

export function getWeekCompletion(weeklySchedule, completedIds) {
  const scheduledDays = Object.values(weeklySchedule);
  const total = scheduledDays.reduce((sum, day) => sum + day.exerciseIds.length, 0);
  if (total === 0) {
    return { percent: 0, doneCount: 0, total: 0 };
  }
  const doneCount = scheduledDays.reduce(
    (sum, day) => sum + day.exerciseIds.filter((id) => completedIds.includes(id)).length,
    0
  );
  return { percent: doneCount / total, doneCount, total };
}

export function getProgressColor(percent) {
  if (percent >= 1) {
    return '#16a34a';
  }
  if (percent >= 0.66) {
    return '#eab308';
  }
  if (percent >= 0.33) {
    return '#f97316';
  }
  return '#dc2626';
}

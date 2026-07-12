export function getCurrentWeekRange(referenceDate = new Date()) {
  const startOfToday = new Date(referenceDate);
  startOfToday.setHours(0, 0, 0, 0);

  const jsDay = startOfToday.getDay();
  const daysSinceMonday = jsDay === 0 ? 6 : jsDay - 1;
  const monday = new Date(startOfToday);
  monday.setDate(startOfToday.getDate() - daysSinceMonday);

  const endOfToday = new Date(referenceDate);
  endOfToday.setHours(23, 59, 59, 999);

  return { start: monday, end: endOfToday };
}

function getEntriesThisWeek(struggleLogs, postSetNotes) {
  const { start, end } = getCurrentWeekRange();
  const inRange = (timestamp) => timestamp >= start.getTime() && timestamp <= end.getTime();

  const struggleEntries = struggleLogs
    .filter((entry) => inRange(entry.timestamp))
    .map((entry) => ({ ...entry, type: 'struggle' }));
  const noteEntries = postSetNotes
    .filter((entry) => inRange(entry.timestamp))
    .map((entry) => ({ ...entry, type: 'note' }));

  return [...struggleEntries, ...noteEntries].sort((a, b) => a.timestamp - b.timestamp);
}

function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

export function buildWeeklyReportText({ userName, struggleLogs, postSetNotes }) {
  const { start, end } = getCurrentWeekRange();
  const entries = getEntriesThisWeek(struggleLogs, postSetNotes);

  let text = 'KineticTrack Weekly Report\n';
  text += `Patient: ${userName}\n`;
  text += `Week: ${formatDateLabel(start)} - ${formatDateLabel(end)}\n\n`;

  if (entries.length === 0) {
    text += 'No trouble flags or notes logged this week.\n';
    return text;
  }

  entries.forEach((entry) => {
    const entryDate = new Date(entry.timestamp);
    const weekday = entryDate.toLocaleDateString(undefined, { weekday: 'long' });
    const time = entryDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    text += `[${weekday} ${time}] ${entry.exerciseName}\n`;
    if (entry.type === 'struggle') {
      text += `  Reported trouble${entry.note ? `: "${entry.note}"` : ''}\n`;
    } else {
      text += `  Note: "${entry.note}"\n`;
    }
    text += '\n';
  });

  return text;
}

export { getEntriesThisWeek, formatDateLabel };

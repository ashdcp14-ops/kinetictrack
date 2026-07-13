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

function formatDateLabel(date, locale) {
  return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
}

export function buildWeeklyReportText({ userName, struggleLogs, postSetNotes, t, locale }) {
  const { start, end } = getCurrentWeekRange();
  const entries = getEntriesThisWeek(struggleLogs, postSetNotes);

  let text = `${t('weeklyReport.reportHeader')}\n`;
  text += `${t('weeklyReport.patient')}: ${userName}\n`;
  text += `${t('weeklyReport.week')}: ${formatDateLabel(start, locale)} - ${formatDateLabel(end, locale)}\n\n`;

  if (entries.length === 0) {
    text += `${t('weeklyReport.noEntries')}\n`;
    return text;
  }

  entries.forEach((entry) => {
    const entryDate = new Date(entry.timestamp);
    const weekday = entryDate.toLocaleDateString(locale, { weekday: 'long' });
    const time = entryDate.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
    text += `[${weekday} ${time}] ${entry.exerciseName}\n`;
    if (entry.type === 'struggle') {
      text += `  ${t('weeklyReport.reportedTrouble')}${entry.note ? `: "${entry.note}"` : ''}\n`;
    } else {
      text += `  ${t('weeklyReport.note')}: "${entry.note}"\n`;
    }
    text += '\n';
  });

  return text;
}

export { getEntriesThisWeek, formatDateLabel };

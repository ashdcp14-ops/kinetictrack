import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_NAME: 'kinetictrack.userName',
  LANGUAGE: 'kinetictrack.language',
  WEEKLY_SCHEDULE: 'kinetictrack.weeklySchedule',
  STRUGGLE_LOGS: 'kinetictrack.struggleLogs',
  POST_SET_NOTES: 'kinetictrack.postSetNotes',
  COMPLETED_BY_DAY: 'kinetictrack.completedByDay',
};

export async function loadJSON(key, fallback) {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function saveJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}

export const EXERCISES_BY_AREA = {
  Knee: [
    { id: 'knee-1', name: 'Seated Knee Extension' },
    { id: 'knee-2', name: 'Straight Leg Raise' },
  ],
  Hip: [
    { id: 'hip-1', name: 'Glute Bridge' },
    { id: 'hip-2', name: 'Standing Hip Abduction' },
  ],
  Shoulder: [
    { id: 'shoulder-1', name: 'Band External Rotation' },
    { id: 'shoulder-2', name: 'Assisted Front Raise' },
  ],
};

export function getExercisesForAreas(areas) {
  return areas.flatMap((area) => EXERCISES_BY_AREA[area] ?? []);
}

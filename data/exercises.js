export const PROBLEM_AREAS = [
  'Shoulder & Rotator Cuff',
  'Hip & Glutes',
  'Knee & Quadriceps / Hamstrings',
  'Lower Back & Core (Spinal Stability)',
  'Upper Back & Arms (Elbow / Wrist)',
  'Advanced Stage: Plyometrics & Agility (Return to Sport)',
];

export const EXERCISES_BY_AREA = {
  'Shoulder & Rotator Cuff': [
    { id: 'shoulder-1', name: 'Band External Rotation' },
    { id: 'shoulder-2', name: 'Assisted Front Raise' },
  ],
  'Hip & Glutes': [
    { id: 'hip-1', name: 'Glute Bridge' },
    { id: 'hip-2', name: 'Standing Hip Abduction' },
  ],
  'Knee & Quadriceps / Hamstrings': [
    { id: 'knee-1', name: 'Seated Knee Extension' },
    { id: 'knee-2', name: 'Straight Leg Raise' },
  ],
  'Lower Back & Core (Spinal Stability)': [
    { id: 'core-1', name: 'Bird Dog' },
    { id: 'core-2', name: 'Dead Bug' },
  ],
  'Upper Back & Arms (Elbow / Wrist)': [
    { id: 'upper-1', name: 'Wrist Flexor Stretch' },
    { id: 'upper-2', name: 'Band Elbow Flexion' },
  ],
  'Advanced Stage: Plyometrics & Agility (Return to Sport)': [
    { id: 'advanced-1', name: 'Lateral Bounds' },
    { id: 'advanced-2', name: 'Box Step-Down' },
  ],
};

export function getExercisesForAreas(areas) {
  return areas.flatMap((area) => EXERCISES_BY_AREA[area] ?? []);
}

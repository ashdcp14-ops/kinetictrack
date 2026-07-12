export const EXERCISES_BY_AREA = {
  Rodilla: [
    { id: 'rodilla-1', name: 'Extensión de rodilla sentado' },
    { id: 'rodilla-2', name: 'Elevación de pierna recta' },
  ],
  Cadera: [
    { id: 'cadera-1', name: 'Puente de glúteos' },
    { id: 'cadera-2', name: 'Abducción de cadera de pie' },
  ],
  Hombro: [
    { id: 'hombro-1', name: 'Rotación externa con banda' },
    { id: 'hombro-2', name: 'Elevación frontal asistida' },
  ],
};

export function getExercisesForAreas(areas) {
  return areas.flatMap((area) => EXERCISES_BY_AREA[area] ?? []);
}

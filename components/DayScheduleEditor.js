import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREAS, PROBLEM_AREA_ICONS, getExercisesForAreas } from '../data/exercises';

const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;
const SETS_RANGE = { min: 1, max: 10 };
const REPS_RANGE = { min: 1, max: 50 };

function Stepper({ label, value, onDecrement, onIncrement }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity style={styles.stepperButton} onPress={onDecrement}>
          <Text style={styles.stepperButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={onIncrement}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DayScheduleEditor({ daySchedule, onChange }) {
  const category = daySchedule?.category ?? null;
  const exercises = daySchedule?.exercises ?? [];
  const categoryExercises = category ? getExercisesForAreas([category]) : [];

  function assignCategory(newCategory) {
    onChange({ category: newCategory, exercises: [] });
  }

  function toggleExercise(exerciseId) {
    const alreadyIncluded = exercises.some((exercise) => exercise.id === exerciseId);
    const updatedExercises = alreadyIncluded
      ? exercises.filter((exercise) => exercise.id !== exerciseId)
      : [...exercises, { id: exerciseId, sets: DEFAULT_SETS, reps: DEFAULT_REPS }];
    onChange({ category, exercises: updatedExercises });
  }

  function updateExerciseField(exerciseId, field, delta) {
    const range = field === 'sets' ? SETS_RANGE : REPS_RANGE;
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id !== exerciseId) {
        return exercise;
      }
      const newValue = Math.min(range.max, Math.max(range.min, exercise[field] + delta));
      return { ...exercise, [field]: newValue };
    });
    onChange({ category, exercises: updatedExercises });
  }

  return (
    <View>
      {PROBLEM_AREAS.map((areaCategory) => {
        const isSelected = category === areaCategory;
        return (
          <TouchableOpacity
            key={areaCategory}
            style={[styles.option, styles.categoryOption, isSelected && styles.optionSelected]}
            onPress={() => assignCategory(areaCategory)}
          >
            <View style={[styles.categoryIconCircle, isSelected && styles.categoryIconCircleSelected]}>
              <Image
                source={PROBLEM_AREA_ICONS[areaCategory]}
                style={styles.categoryIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.optionText, styles.categoryOptionText, isSelected && styles.optionTextSelected]}>
              {areaCategory}
            </Text>
            <Text style={styles.categoryRadio}>{isSelected ? '●' : '○'}</Text>
          </TouchableOpacity>
        );
      })}

      {category && (
        <View style={styles.exerciseChecklist}>
          <Text style={styles.exerciseChecklistLabel}>Which exercises?</Text>
          {categoryExercises.map((exercise) => {
            const config = exercises.find((item) => item.id === exercise.id);
            const isChecked = Boolean(config);
            return (
              <View key={exercise.id} style={styles.exerciseBlock}>
                <TouchableOpacity style={styles.exerciseOption} onPress={() => toggleExercise(exercise.id)}>
                  <Text style={styles.exerciseOptionText}>
                    {isChecked ? '☑' : '☐'} {exercise.name}
                  </Text>
                </TouchableOpacity>

                {isChecked && (
                  <View style={styles.stepperRow}>
                    <Stepper
                      label="Sets"
                      value={config.sets}
                      onDecrement={() => updateExerciseField(exercise.id, 'sets', -1)}
                      onIncrement={() => updateExerciseField(exercise.id, 'sets', 1)}
                    />
                    <Stepper
                      label="Reps"
                      value={config.reps}
                      onDecrement={() => updateExerciseField(exercise.id, 'reps', -1)}
                      onIncrement={() => updateExerciseField(exercise.id, 'reps', 1)}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  categoryIconCircleSelected: {
    backgroundColor: '#dbeafe',
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryOptionText: {
    flex: 1,
  },
  categoryRadio: {
    fontSize: 16,
    color: '#2563eb',
    marginLeft: 8,
  },
  exerciseChecklist: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 14,
    marginTop: 4,
  },
  exerciseChecklistLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  exerciseBlock: {
    marginBottom: 4,
  },
  exerciseOption: {
    paddingVertical: 8,
  },
  exerciseOptionText: {
    fontSize: 15,
  },
  stepperRow: {
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 8,
  },
  stepper: {
    marginRight: 24,
  },
  stepperLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  stepperValue: {
    width: 32,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});

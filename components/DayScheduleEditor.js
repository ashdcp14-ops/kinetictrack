import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREAS, PROBLEM_AREA_ICONS, getExercisesForAreas } from '../data/exercises';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW, getCategoryAccent } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

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
  const { t, translateCategory, translateExercise } = useLanguage();
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
      {PROBLEM_AREAS.map((areaCategory, index) => {
        const isSelected = category === areaCategory;
        const accent = getCategoryAccent(index);
        return (
          <TouchableOpacity
            key={areaCategory}
            style={[
              styles.option,
              styles.categoryOption,
              { backgroundColor: accent.bg },
              isSelected && { borderColor: accent.text, ...SHADOW.card },
            ]}
            onPress={() => assignCategory(areaCategory)}
          >
            <View style={styles.categoryIconCircle}>
              <Image
                source={PROBLEM_AREA_ICONS[areaCategory]}
                style={styles.categoryIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.optionText, styles.categoryOptionText, { color: accent.text }]}>
              {translateCategory(areaCategory)}
            </Text>
            <Text style={[styles.categoryRadio, { color: accent.text }]}>
              {isSelected ? '●' : '○'}
            </Text>
          </TouchableOpacity>
        );
      })}

      {category && (
        <View style={styles.exerciseChecklist}>
          <Text style={styles.exerciseChecklistLabel}>{t('dayScheduleEditor.whichExercises')}</Text>
          {categoryExercises.map((exercise) => {
            const config = exercises.find((item) => item.id === exercise.id);
            const isChecked = Boolean(config);
            const localizedExercise = translateExercise(exercise);
            return (
              <View key={exercise.id} style={styles.exerciseBlock}>
                <TouchableOpacity style={styles.exerciseOption} onPress={() => toggleExercise(exercise.id)}>
                  <Text style={styles.exerciseOptionText}>
                    {isChecked ? '☑' : '☐'} {localizedExercise.name}
                  </Text>
                </TouchableOpacity>

                {isChecked && (
                  <View style={styles.stepperRow}>
                    <Stepper
                      label={t('dayScheduleEditor.sets')}
                      value={config.sets}
                      onDecrement={() => updateExerciseField(exercise.id, 'sets', -1)}
                      onIncrement={() => updateExerciseField(exercise.id, 'sets', 1)}
                    />
                    <Stepper
                      label={t('dayScheduleEditor.reps')}
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
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconCircle: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    overflow: 'hidden',
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
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  exerciseChecklist: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.xs,
  },
  exerciseChecklistLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  exerciseBlock: {
    marginBottom: SPACING.xs,
  },
  exerciseOption: {
    paddingVertical: SPACING.sm,
  },
  exerciseOptionText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
  },
  stepperRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    marginLeft: SPACING.sm,
  },
  stepper: {
    marginRight: SPACING.xl,
  },
  stepperLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  stepperValue: {
    width: 32,
    textAlign: 'center',
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

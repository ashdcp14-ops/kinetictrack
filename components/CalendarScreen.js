import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PROBLEM_AREAS, PROBLEM_AREA_ICONS, getExercisesForAreas } from '../data/exercises';
import MonthCalendar from './MonthCalendar';
import DayScheduleEditor from './DayScheduleEditor';
import BottomNavBar from './BottomNavBar';
import { COLORS, RADIUS, SPACING, FONT_SIZES, getCategoryAccent } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

function getDayExercises(daySchedule) {
  if (!daySchedule) {
    return [];
  }
  const categoryExercises = getExercisesForAreas([daySchedule.category]);
  return daySchedule.exercises.map((config) => ({
    ...categoryExercises.find((exercise) => exercise.id === config.id),
    sets: config.sets,
    reps: config.reps,
  }));
}

export default function CalendarScreen({
  visible,
  onClose,
  weeklySchedule,
  onUpdateDaySchedule,
  activeTab,
  onNavigate,
}) {
  const { t, translateDay, translateCategory, translateExercise } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(null);
  const [step, setStep] = useState('calendar');
  const [draftSchedule, setDraftSchedule] = useState(null);

  if (!visible) {
    return null;
  }

  function handleSelectDay(day) {
    setSelectedDay(day);
    setStep('detail');
  }

  function handleBackToCalendar() {
    setSelectedDay(null);
    setStep('calendar');
  }

  function handleStartEdit() {
    setDraftSchedule(weeklySchedule[selectedDay] ?? { category: null, exercises: [] });
    setStep('edit');
  }

  const canSaveDraft = Boolean(draftSchedule?.category) && (draftSchedule?.exercises.length ?? 0) > 0;

  function handleSave() {
    onUpdateDaySchedule(selectedDay, canSaveDraft ? draftSchedule : null);
    setSelectedDay(null);
    setStep('calendar');
  }

  function handleRemove() {
    onUpdateDaySchedule(selectedDay, null);
    setSelectedDay(null);
    setStep('calendar');
  }

  const daySchedule = selectedDay ? weeklySchedule[selectedDay] ?? null : null;
  const categoryAccent = daySchedule
    ? getCategoryAccent(PROBLEM_AREAS.indexOf(daySchedule.category))
    : null;

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
    <View style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={step === 'calendar' ? onClose : handleBackToCalendar}
        >
          <Text style={styles.backButtonText}>
            {step === 'calendar' ? t('calendar.back') : t('calendar.backToCalendar')}
          </Text>
        </TouchableOpacity>

        {step === 'calendar' && (
          <>
            <Text style={styles.title}>{t('calendar.title')}</Text>
            <Text style={styles.subtitle}>{t('calendar.subtitle')}</Text>
            <MonthCalendar weeklySchedule={weeklySchedule} onSelectDay={handleSelectDay} />
          </>
        )}

        {step === 'detail' && (
          <>
            <Text style={styles.title}>{translateDay(selectedDay)}</Text>

            {daySchedule ? (
              <>
                <View style={[styles.categoryRow, { backgroundColor: categoryAccent.bg }]}>
                  <Image
                    source={PROBLEM_AREA_ICONS[daySchedule.category]}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.categoryText, { color: categoryAccent.text }]}>
                    {translateCategory(daySchedule.category)}
                  </Text>
                </View>

                {getDayExercises(daySchedule).map((exercise) => {
                  const localizedExercise = translateExercise(exercise);
                  return (
                    <View key={exercise.id} style={styles.exerciseRow}>
                      <Text style={styles.exerciseName}>{localizedExercise.name}</Text>
                      <Text style={styles.exerciseMeta}>
                        {t('calendar.exerciseMeta', exercise.sets, exercise.reps)}
                      </Text>
                    </View>
                  );
                })}
              </>
            ) : (
              <Text style={styles.restText}>{t('calendar.restText')}</Text>
            )}

            <TouchableOpacity style={styles.editButton} onPress={handleStartEdit}>
              <Text style={styles.editButtonText}>
                {daySchedule ? t('calendar.editThisDay') : t('calendar.addWorkout')}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 'edit' && (
          <>
            <Text style={styles.title}>{t('calendar.editDayTitle', translateDay(selectedDay))}</Text>

            <DayScheduleEditor daySchedule={draftSchedule} onChange={setDraftSchedule} />

            <TouchableOpacity
              style={[styles.saveButton, !canSaveDraft && styles.saveButtonDisabled]}
              disabled={!canSaveDraft}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>{t('calendar.saveChanges')}</Text>
            </TouchableOpacity>

            {daySchedule && (
              <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                <Text style={styles.removeButtonText}>{t('calendar.removeDay')}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
      <BottomNavBar activeTab={activeTab} onNavigate={onNavigate} />
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: 100,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: SPACING.sm,
  },
  categoryText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.primary,
  },
  exerciseRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md,
  },
  exerciseName: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  exerciseMeta: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
  },
  restText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
  },
  editButton: {
    marginTop: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.primaryBorder,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  removeButton: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  removeButtonText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { requestNotificationPermissions, scheduleDailyReminder } from '../utils/notifications';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

const TIME_OPTIONS = [
  { label: '7:00 AM', hour: 7, minute: 0 },
  { label: '9:00 AM', hour: 9, minute: 0 },
  { label: '1:00 PM', hour: 13, minute: 0 },
  { label: '6:00 PM', hour: 18, minute: 0 },
];

export default function ReminderSettings({ visible, onClose }) {
  const [confirmedTime, setConfirmedTime] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  if (!visible) {
    return null;
  }

  async function handleSelectTime(option) {
    const granted = await requestNotificationPermissions();
    if (!granted) {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);
    await scheduleDailyReminder(option.hour, option.minute);
    setConfirmedTime(option.label);
  }

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Daily reminder</Text>
        <Text style={styles.subtitle}>
          Pick a time and we'll send a gentle nudge to start your routine.
        </Text>

        {TIME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.label}
            style={[styles.option, confirmedTime === option.label && styles.optionSelected]}
            onPress={() => handleSelectTime(option)}
          >
            <Text
              style={[
                styles.optionText,
                confirmedTime === option.label && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}

        {confirmedTime && (
          <Text style={styles.confirmation}>Reminder set for {confirmedTime} ✓</Text>
        )}
        {permissionDenied && (
          <Text style={styles.error}>
            Notifications are turned off. Enable them in your device settings to get reminders.
          </Text>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  optionTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  confirmation: {
    marginTop: SPACING.sm,
    color: COLORS.accent,
    fontWeight: '600',
  },
  error: {
    marginTop: SPACING.sm,
    color: COLORS.danger,
  },
  closeButton: {
    marginTop: 'auto',
    marginBottom: SPACING.xl,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  closeButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { requestNotificationPermissions, scheduleDailyReminder } from '../utils/notifications';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

const TIME_OPTIONS = [
  { hour: 7, minute: 0 },
  { hour: 9, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 0 },
];

function formatTimeLabel(hour, minute, language) {
  const minuteLabel = minute.toString().padStart(2, '0');
  if (language === 'es') {
    return `${hour.toString().padStart(2, '0')}:${minuteLabel}`;
  }
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minuteLabel} ${period}`;
}

export default function ReminderSettings({ visible, onClose }) {
  const { t, language } = useLanguage();
  const [confirmedTime, setConfirmedTime] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  if (!visible) {
    return null;
  }

  async function handleSelectTime(option, label) {
    const granted = await requestNotificationPermissions();
    if (!granted) {
      setPermissionDenied(true);
      return;
    }
    setPermissionDenied(false);
    await scheduleDailyReminder(
      option.hour,
      option.minute,
      t('reminderSettings.notificationTitle'),
      t('reminderSettings.notificationBody')
    );
    setConfirmedTime(label);
  }

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('reminderSettings.title')}</Text>
        <Text style={styles.subtitle}>{t('reminderSettings.subtitle')}</Text>

        {TIME_OPTIONS.map((option) => {
          const label = formatTimeLabel(option.hour, option.minute, language);
          return (
            <TouchableOpacity
              key={label}
              style={[styles.option, confirmedTime === label && styles.optionSelected]}
              onPress={() => handleSelectTime(option, label)}
            >
              <Text
                style={[
                  styles.optionText,
                  confirmedTime === label && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {confirmedTime && (
          <Text style={styles.confirmation}>{t('reminderSettings.confirmed', confirmedTime)}</Text>
        )}
        {permissionDenied && (
          <Text style={styles.error}>{t('reminderSettings.permissionDenied')}</Text>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{t('reminderSettings.done')}</Text>
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

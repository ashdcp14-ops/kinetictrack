import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { requestNotificationPermissions, scheduleDailyReminder } from '../utils/notifications';

const TIME_OPTIONS = [
  { label: '7:00 AM', hour: 7, minute: 0 },
  { label: '9:00 AM', hour: 9, minute: 0 },
  { label: '1:00 PM', hour: 13, minute: 0 },
  { label: '6:00 PM', hour: 18, minute: 0 },
];

export default function ReminderSettings({ visible, onClose }) {
  const [confirmedTime, setConfirmedTime] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

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
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
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
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
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
  confirmation: {
    marginTop: 8,
    color: '#16a34a',
    fontWeight: '600',
  },
  error: {
    marginTop: 8,
    color: '#dc2626',
  },
  closeButton: {
    marginTop: 'auto',
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 14,
  },
  closeButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});

import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCurrentWeekRange, buildWeeklyReportText, formatDateLabel } from '../utils/report';
import ExportButton from './ExportButton';

export default function WeeklyReportScreen({ visible, onClose, userName, struggleLogs, postSetNotes }) {
  if (!visible) {
    return null;
  }

  const { start, end } = getCurrentWeekRange();
  const reportText = buildWeeklyReportText({ userName, struggleLogs, postSetNotes });

  return (
    <Modal visible animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Weekly Report</Text>
        <Text style={styles.subtitle}>
          {formatDateLabel(start)} – {formatDateLabel(end)}
        </Text>
        <Text style={styles.helperText}>
          Share this with your physical therapist — it only covers this week so far.
        </Text>

        <View style={styles.previewBox}>
          <Text style={styles.previewText}>{reportText}</Text>
        </View>

        <ExportButton reportText={reportText} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
  },
  previewBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
  },
  previewText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});

import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ExportButton({ reportText }) {
  async function handleExport() {
    try {
      await Share.share({ message: reportText, title: 'KineticTrack Weekly Report' });
    } catch {
      // Share sheet dismissed or unavailable — nothing to do.
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleExport}>
      <Text style={styles.buttonText}>📤 Export / Share Report</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ExportButton({ reportText }) {
  async function handleExport() {
    if (navigator.share) {
      try {
        await navigator.share({ text: reportText, title: 'KineticTrack Weekly Report' });
        return;
      } catch {
        // User cancelled the share sheet — fall through to download instead.
      }
    }

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kinetictrack-weekly-report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleExport}>
      <Text style={styles.buttonText}>📤 Download / Share Report</Text>
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

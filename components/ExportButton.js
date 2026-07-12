import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';

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
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

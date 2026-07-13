import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

export default function ExportButton({ reportText }) {
  const { t } = useLanguage();

  async function handleExport() {
    if (navigator.share) {
      try {
        await navigator.share({ text: reportText, title: t('weeklyReport.shareTitle') });
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
      <Text style={styles.buttonText}>{t('weeklyReport.downloadButton')}</Text>
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

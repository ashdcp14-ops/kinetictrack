import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

export default function ExportButton({ reportText }) {
  const { t } = useLanguage();

  async function handleExport() {
    try {
      await Share.share({ message: reportText, title: t('weeklyReport.shareTitle') });
    } catch {
      // Share sheet dismissed or unavailable — nothing to do.
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleExport}>
      <Text style={styles.buttonText}>{t('weeklyReport.exportButton')}</Text>
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

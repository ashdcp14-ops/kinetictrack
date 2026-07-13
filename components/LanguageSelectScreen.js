import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

export default function LanguageSelectScreen({ onSelect }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Welcome to KineticTrack{'\n'}Bienvenido a KineticTrack</Text>
      <Text style={styles.subtitle}>
        Choose your preferred language{'\n'}Elige tu idioma preferido
      </Text>

      <TouchableOpacity style={styles.option} onPress={() => onSelect('en')}>
        <Text style={styles.optionText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => onSelect('es')}>
        <Text style={styles.optionText}>Español</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    lineHeight: 21,
  },
  option: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  optionText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

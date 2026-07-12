export const COLORS = {
  primary: '#1F7A8C',
  primaryDark: '#155E6B',
  primaryLight: '#E7F3F4',
  primaryBorder: '#BFE0E3',
  accent: '#4C9A78',
  accentLight: '#E7F4EE',
  danger: '#D0525F',
  dangerLight: '#FBEBEC',
  warning: '#E0A544',
  background: '#F7F9FA',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F4F5',
  border: '#E3E8EA',
  textPrimary: '#233238',
  textSecondary: '#66787E',
  textMuted: '#98A6AB',
  white: '#FFFFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  full: 999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 26,
};

export const SHADOW = {
  card: {
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  raised: {
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
};

export function getProgressColor(percent) {
  if (percent >= 1) {
    return COLORS.accent;
  }
  if (percent >= 0.66) {
    return '#D9B84C';
  }
  if (percent >= 0.33) {
    return COLORS.warning;
  }
  return COLORS.danger;
}

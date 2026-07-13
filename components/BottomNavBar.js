import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';
import { useLanguage } from '../utils/i18n';

const TABS = [
  { key: 'home', icon: '🏠', labelKey: 'bottomNav.home' },
  { key: 'calendar', icon: '📅', labelKey: 'bottomNav.calendar' },
  { key: 'clinic', icon: '📋', labelKey: 'bottomNav.clinic' },
  { key: 'profile', icon: '👤', labelKey: 'bottomNav.profile' },
];

export default function BottomNavBar({ activeTab, onNavigate }) {
  const { t } = useLanguage();
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onNavigate(tab.key)}
          >
            <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
              <Text style={styles.icon}>{tab.icon}</Text>
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{t(tab.labelKey)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    ...SHADOW.raised,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconCircleActive: {
    backgroundColor: COLORS.primaryLight,
  },
  icon: {
    fontSize: 19,
  },
  label: {
    fontSize: FONT_SIZES.xs - 1,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.primary,
  },
});

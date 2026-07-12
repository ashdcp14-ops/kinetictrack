import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, SHADOW } from '../utils/theme';

const TABS = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'calendar', icon: '📅', label: 'Calendar' },
  { key: 'clinic', icon: '📋', label: 'Clinic' },
  { key: 'profile', icon: '👤', label: 'Profile' },
];

export default function BottomNavBar({ activeTab, onNavigate }) {
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
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
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

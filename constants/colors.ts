const BLUE_PRIMARY = "#3B82F6";
const BLUE_LIGHT = "#EEF6FF";
const BLUE_MED = "#BFDBFE";
const GOLD = "#F59E0B";
const GOLD_LIGHT = "#FEF3C7";

export const Colors = {
  primary: BLUE_PRIMARY,
  primaryLight: BLUE_LIGHT,
  primaryMed: BLUE_MED,
  gold: GOLD,
  goldLight: GOLD_LIGHT,
  success: "#10B981",
  successLight: "#D1FAE5",
  danger: "#EF4444",
  dangerLight: "#FEE2E2",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  background: "#F8FBFF",
  card: "#FFFFFF",
  text: "#1E293B",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  tabBar: "#FFFFFF",
  tabBarActive: BLUE_PRIMARY,
  tabBarInactive: "#94A3B8",
};

export default {
  light: {
    text: Colors.text,
    background: Colors.background,
    tint: Colors.primary,
    tabIconDefault: Colors.tabBarInactive,
    tabIconSelected: Colors.tabBarActive,
  },
};

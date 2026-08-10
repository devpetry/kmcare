export const colors = {
  primary: "#1a73e8",
  error: "#e53935",
  textPrimary: "#333",
  textSecondary: "#666",
  textMuted: "#999",
  border: "#ccc",
  borderLight: "#eee",
  background: "#f7f7f7",
  white: "#fff",
  warningBg: "#fff3e0",
  warningText: "#e65100",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  pill: 20,
  circle: 28,
};

export const typography = {
  title: { fontSize: 32, fontWeight: "bold" as const },
  sectionTitle: { fontSize: 22, fontWeight: "bold" as const },
  subtitle: { fontSize: 14, color: colors.textSecondary },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.textPrimary,
  },
  body: { fontSize: 16 },
  bodySmall: { fontSize: 15 },
  caption: { fontSize: 13, color: colors.textSecondary },
  small: { fontSize: 12, color: colors.textMuted },
};
import { colors } from '../../theme';

const lightPalette = {
  cardBackground: colors.surface.elevated,
  border: colors.border.subtle,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  inputBackground: colors.surface.primary,
  inputBorder: colors.border.strong,
  buttonBackground: colors.action.primary,
  buttonText: colors.text.inverse,
  switchTrackFalse: colors.border.strong,
  switchTrackTrue: colors.brand.g1,
  switchThumb: colors.surface.primary,
};

const darkPalette = {
  cardBackground: '#111827',
  border: '#374151',
  textPrimary: '#f9fafb',
  textSecondary: '#d1d5db',
  inputBackground: '#1f2937',
  inputBorder: '#4b5563',
  buttonBackground: colors.brand.r2,
  buttonText: colors.text.inverse,
  switchTrackFalse: '#4b5563',
  switchTrackTrue: colors.brand.g1,
  switchThumb: '#f9fafb',
};

export const getSectionPalette = (isDarkMode?: boolean) =>
  isDarkMode ? darkPalette : lightPalette;

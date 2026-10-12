import { colors } from './colors';

export const shadows = {
  card: {
    shadowColor: colors.brand.r4,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
} as const;

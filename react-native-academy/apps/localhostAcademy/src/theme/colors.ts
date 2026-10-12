export const brandColors = {
  r1: '#ef4130',
  r2: '#f3704b',
  r3: '#f26664',
  r4: '#c14243',
  g1: '#5bc4bf',
  g2: '#84c98b',
} as const;

export const colors = {
  brand: brandColors,
  text: {
    primary: '#1f2937',
    secondary: '#374151',
    muted: '#6b7280',
    inverse: '#ffffff',
  },
  surface: {
    canvas: '#fff7f4',
    primary: '#ffffff',
    elevated: '#ffffff',
    subtle: '#fff1ed',
  },
  border: {
    subtle: '#ffd8cf',
    strong: '#f4b2a3',
  },
  action: {
    primary: brandColors.r1,
    primaryPressed: brandColors.r4,
    link: brandColors.r2,
  },
  status: {
    success: brandColors.g1,
    successSoft: '#e9fbf9',
  },
  badge: {
    color: '#102347',
    backgroundColor: '#ffdd7a',
  },
} as const;

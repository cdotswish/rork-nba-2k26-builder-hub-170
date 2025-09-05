export const theme = {
  colors: {
    primary: '#FFD700', // Gold
    secondary: '#1a1a1a', // Dark black
    accent: '#FF4500', // Orange-red
    background: '#0a0a0a', // Deep black
    surface: '#1a1a1a', // Card background
    text: '#FFFFFF',
    textSecondary: '#999999',
    success: '#4CAF50',
    error: '#FF5252',
    border: '#333333',
    
    // Position colors
    positions: {
      PG: '#FF6B6B',
      SG: '#4ECDC4',
      SF: '#45B7D1',
      PF: '#96CEB4',
      C: '#FFEAA7',
    },
    
    // Badge colors
    badges: {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Hall of Fame': '#9B59B6',
      'Legend': '#FF0000',
    },
    
    // Category colors
    categories: {
      'Finishing': '#E74C3C',
      'Shooting': '#3498DB',
      'Playmaking': '#2ECC71',
      'Defense': '#9B59B6',
      'Rebounding': '#F39C12',
      'Physicals': '#8E44AD',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '900' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: '800' as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: '700' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
    },
  },
};
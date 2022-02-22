import { ThemeOptions } from '@mui/material';

export const PS_BROWN_DARK = '#212120';
export const PS_DARK_DIVIDER = '#525252';
export const PS_GREY_DIVIDER = '#3B3B3B';
export const PS_DARK_DIVIDER_DISABLED = 'rgba(0,229,201,0.5)';
export const PS_CYAN_LIGHT = '#00E5C9';
export const PS_CYAN_DARK = '#05bba5';
export const PS_ORANGE = '#F5A627';
export const PS_GREEN = '#00E05F';
export const PS_YELLOW_LIGHT = '#FAB93F';
export const PS_GRAY_1 = '#141414';
export const PS_GRAY_2 = '#4E4E4E';
export const PS_RED = '#F72828';
export const PS_BLUE_MAIN = '#F5A627';
export const PS_GREEN_2 = '#28F760';
export const PS_LIGHT_BLUE = '#68FDEC';
export const PS_DARK_ORANGE = '#F78E00';
export const PS_LIGHT_ORANGE = '#FDBE68';

export const PS_TIME_SCHEDULE_WHITE = '#FFFFFF';
export const PS_TIME_SCHEDULE_GREEN = '#33F28B';
export const PS_TIME_SCHEDULE_ORANGE = '#FFAB2E';
export const PS_TIME_SCHEDULE_RED = '#FF3D22';
export const PS_TIME_SCHEDULE_BLUE = '#2BB2FF';

export const PS_DARK_1 = '#10202b';
export const PS_DARK_2_TRANSPARENT_0_2 = '#314654';
export const PS_DARK_3 = '#224258';

export const PS_BLUE_GRAY = '#354958';

export const PS_GRAY_3 = '#868686';
export const PS_GRAY_4 = '#363636';
export const PS_GRAY_5 = '#2C2C2C';

export const PS_TEXT_COLOR = '#000000';
export const PS_GREY_LIGHT = '#EFE';
export const PS_BLACK = '#000';

export const TIMESHEET_TABLE_COLORS = {
  GREEN: '#61F586',
  GREY: '#45474C',
  YELLOW: '#FFDF20',
  ORANGE: '#FE9F00',
  PINK: '#E94773',
  BLUE: '#421DFF',
  CYAN: '#1EE7C9',
};

export const PS_BLUE = '#2750FC';
export const PS_DARK_BLUE = '#2750FC';
export const PS_NAVY_BLUE = '#141414';
export const PS_DARK = '#000000';
export const PS_ORANGE_NEW = '#FA8E00';

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: PS_BLUE,
      dark: PS_BLUE,
    },
    secondary: {
      main: PS_BLUE,
      dark: PS_BLUE,
    },
    error: {
      main: PS_RED,
      dark: PS_RED,
    },
    warning: {
      main: PS_BLUE_MAIN,
      dark: PS_BLUE_MAIN,
    },
    info: {
      main: '#ff0000',
      dark: '#ff0000',
    },
    success: {
      main: PS_GREEN_2,
      dark: PS_ORANGE_NEW,
      light: PS_NAVY_BLUE,
    },
    background: {
      paper: PS_NAVY_BLUE,
      default: PS_DARK,
    },
    text: {
      primary: PS_TEXT_COLOR,
      secondary: PS_DARK_BLUE,
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    htmlFontSize: 18,
  },
};

export const hexToRGBa = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

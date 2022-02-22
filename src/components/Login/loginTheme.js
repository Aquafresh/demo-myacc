import {
  buttonThemeNamespace,
  textThemeNamespace,
} from '@webapp/ui-kit/src/namespaces';

export const loginTheme = theme => ({
  [buttonThemeNamespace]: {
    appearance: {
      loginButton: {
        backgroundColor: theme.colors.default[0],
        borderColor: theme.colors.default[0],
        color: theme.colors.white,
        padding: '15px 20px',
        width: '100%',
      },
      resendEmailConfirm: {
        backgroundColor: theme.colors.default[0],
        borderColor: theme.colors.default[0],
        padding: '15px 20px',
        width: '100%',
      },
    },
  },
  [textThemeNamespace]: {
    appearance: {
      primaryButtonText: {
        color: theme.colors.white,
      },
    },
  },
});

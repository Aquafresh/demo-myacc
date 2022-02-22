import {
  ON_LOGIN_FORM_SUBMIT,
  LOGIN_FORM_INIT,
  LOGIN_GET_REQUEST,
} from './consts';

export const actionOnLoginFormSubmit = () => ({
  type: ON_LOGIN_FORM_SUBMIT,
});

export const actionLoginFormInit = () => ({
  type: LOGIN_FORM_INIT,
});

export const actionLoginGetRequest = payload => ({
  type: LOGIN_GET_REQUEST,
  payload,
});

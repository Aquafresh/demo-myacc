import { call, put, select, takeLatest } from 'redux-saga/effects';
import i18next from 'i18next';

import {
  actionLoadUserInformation,
  getPlatformRedirectUrl,
  selectorGetApiUrl,
  selectorGetFormData,
  selectorGetRedirectionPlatformModelByName,
} from '@my-acc-forex/models/src/app';
import {
  xcriticalFormChange,
  xcriticalFormError,
  xcriticalFormPropertyChange,
} from '@my-acc-forex/xc-front-form-proposal/src/actions';
import { PathNames } from '@my-acc-forex/root/src/components/menu/consts';
import {
  LAST_CONFIRM_EMAIL_HREF,
  setToLocalStorage,
} from '@my-acc-forex/root/src/utils/localStorage';
import { WEB_PLATFORM_NAME } from '@my-acc-forex/models/src/tradingPlatform';

import { getValidationErrors, parseUrlQuery } from '@webapp/utils';
import { http } from '@webapp/http';
import { history } from '@webapp/core';

import {
  actionAuthErrorMessageSet,
  actionAuthRedirectionSet,
  actionSetEmailForConfirmation,
  actionSetWasUserAuthJustNow,
} from '../../actions';
import { NOT_CONFIRMED_EMAIL_ERROR_TYPE } from '../ConfirmEmail/consts';

import { actionLoginGetRequest } from './actions';
import {
  LOGIN_FORM_INIT,
  LOGIN_GET_REQUEST,
  ON_LOGIN_FORM_SUBMIT,
} from './consts';

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_FORM_INIT, handleLoginFormInit);
  yield takeLatest(ON_LOGIN_FORM_SUBMIT, handleOnLoginFormSubmit);
  yield takeLatest(LOGIN_GET_REQUEST, handleFLoginGetRequest);
}

export function* handleLoginFormInit() {
  yield put(
    xcriticalFormChange(
      { formName: 'login' },
      { loginEmail: '', password: '' },
    ),
  );
}

export function* handleOnLoginFormSubmit() {
  yield put(actionAuthErrorMessageSet(null));
  yield put(
    actionAuthRedirectionSet({ isDisabled: true, isRedirecting: true }),
  );
  const {
    login: { model },
  } = yield select(selectorGetFormData);

  const validationErrors = getValidationErrors({ ...model });

  if (validationErrors) {
    yield put(
      actionAuthRedirectionSet({ isDisabled: false, isRedirecting: false }),
    );
    yield put(
      xcriticalFormError(
        {
          formName: 'login',
        },
        {
          ...validationErrors,
        },
      ),
    );
  } else {
    yield put(actionLoginGetRequest(model));
  }
}

export function* handleFLoginGetRequest({ payload }) {
  const { loginEmail, password } = payload;
  const dataForRequest = {
    email: loginEmail,
    password,
  };

  const url = yield select(selectorGetApiUrl('account/logon'));

  try {
    const user = yield http
      .post(url, dataForRequest, { withCredentials: true })
      .then(response => response.data);

    yield put(actionLoadUserInformation());
    yield put(actionSetWasUserAuthJustNow(true));

    const webPlatformAccounts = user.tradingPlatformAccounts.filter(
      account => account.tradingPlatformTypeName === 'Web Platform',
    );

    const webPlatformConfig = yield select(
      selectorGetRedirectionPlatformModelByName,
      WEB_PLATFORM_NAME,
    );

    const currentUrlQuery = parseUrlQuery(history.location.search);

    if (
      webPlatformAccounts.length === 1 &&
      currentUrlQuery.mode !== 'popup' &&
      currentUrlQuery.autoLogin
    ) {
      const platformRedirectUrl = yield select(
        getPlatformRedirectUrl,
        webPlatformConfig?.content,
        webPlatformAccounts[0].accountId,
      );

      window.open(platformRedirectUrl);
    }

    yield call(postTradingLogon, user, dataForRequest);
  } catch (error) {
    if (error.response.data.errorType === NOT_CONFIRMED_EMAIL_ERROR_TYPE) {
      yield put(actionSetEmailForConfirmation(loginEmail));
      setToLocalStorage(LAST_CONFIRM_EMAIL_HREF, window.location.href);
      yield put(
        actionAuthRedirectionSet({ isDisabled: false, isRedirecting: false }),
      );

      yield call(history.push, {
        pathname: PathNames.confirmEmail,
        search: history.location.search,
      });

      return;
    }

    yield put(
      actionAuthRedirectionSet({ isDisabled: false, isRedirecting: false }),
    );
    yield call(showError, error);
  }
}

export function* showError(response) {
  let errorMessage = null;

  try {
    const json = JSON.parse(response.text);
    errorMessage = json.message;
  } catch (e) {
    errorMessage = i18next.t('login_WrongCredentials');
  }

  yield put(actionAuthErrorMessageSet(errorMessage));
  yield put(xcriticalFormPropertyChange({ formName: 'login' }, 'password', ''));
}

export function* postTradingLogon(response, dataForRequest) {
  if (isDeltix(response)) {
    const url = yield select(selectorGetApiUrl('trading/logon'));

    try {
      yield http
        .post(url, dataForRequest, { withCredentials: true })
        .then(response => response.data);
      // TODO: maybe it is need to store response
    } catch (e) {
      console.error(e);
    }
  }
}

export function isDeltix(response) {
  if (
    response &&
    response.tradingPlatformAccounts &&
    response.tradingPlatformAccounts.length
  ) {
    const account = response.tradingPlatformAccounts[0];

    return !(
      account.tradingPlatform && account.tradingPlatform.indexOf('Meta') >= 0
    );
  }

  return false;
}

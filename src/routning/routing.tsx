import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/Login/Login';

import { PathNames } from './consts';
import {QuestionnairesPage} from "../pages/Questionnaires/Questionnaires";

export const Root = () => (
  <>
    <Switch>
      <Route path="/app">
        <QuestionnairesPage />
      </Route>

      <Route exact path={PathNames.login}>
        <LoginPage />
      </Route>

      <Route exact path="/" />
    </Switch>
  </>
);

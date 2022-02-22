import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './redux/store';
import {Root} from './routning/routing';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {defaultThemeOptions} from './MaterialTheme'

import './style.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();
const theme = createTheme(defaultThemeOptions);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Root/>
            </BrowserRouter>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen/>

        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

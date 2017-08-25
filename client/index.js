import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import styled, {ThemeProvider} from 'styled-components'

// establishes socket connection
import './socket'
import 'bootstrap/dist/css/bootstrap.css'

export const theme = {
  black: 'black',
  white: 'white',
  lightgrey: '#ecf0f1',
  medgrey: '#bdc3c7',
  darkgrey: '#2d2f31',
  darkgreyhover: 'rgba(45, 47, 49, 0.5)',
  color: '#c0392b',
  colorhover: '#e74c3c'
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)

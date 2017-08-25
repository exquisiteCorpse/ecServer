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
  lightgrey: '#585f62',
  medgrey: '#3f4649',
  darkgrey: '#2d2f31',
  darkgreyhover: '#2c3835',
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

import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Header = styled.section`
  {
    position: fixed;
    height: 200px;
    width: 100%;
    top: 50px;
    background-color: ${props => props.theme.white};
    border-bottom: 1px solid ${props => props.theme.darkgrey};
    display: flex;
    align-items: center;

    .header-message {
      font-size: 2rem;
      color: ${props => props.theme.darkgrey};
      margin: 0 auto;
      display: flex;
      align-items: center;

      h1 {
        margin: 0;
        float: left;
      }

      img {
        height: 10rem;
        width: auto;
        float: right;
      }
    }
  }
`
export default Header

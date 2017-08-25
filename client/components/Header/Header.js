import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

// background-image: url('images/guy.jpg');

const Header = styled.section`
  {
    position: fixed;
    height: 100px;
    width: 100%;
    top: 80px;
    background-color: ${props => props.theme.white};
    border-bottom: 1px solid ${props => props.theme.darkgrey};
    display: flex;
    align-items: center;

    .header-message {
      color: ${props => props.theme.darkgrey};
      margin: 0 auto;
      display: flex;
      align-items: center;

      h3 {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
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

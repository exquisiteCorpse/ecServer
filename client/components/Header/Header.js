import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

// background-image: url('images/guy.jpg');

const Header = styled.section`
  {
    position: absolute;
    top: 80px;
    left: 0px;
    height: 100px;
    width: 100%;
    background-color: ${props => props.theme.white};
    border-bottom: 1px solid ${props => props.theme.darkgrey};
    display: flex;
    align-items: center;
    z-index: 2;

    .header-message {
      color: ${props => props.theme.darkgrey};
      margin: 0 auto;

      h3 {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
        text-align: center;
      }
    }

    @media only screen and (max-width: 768px) {
      height: 160px;
    }
  }
`
export default Header

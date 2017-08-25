import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Navbar = styled.section`
  {
    position: fixed;
    height: 80px;
    width: 100%;
    background-color: ${props => props.theme.white};
    z-index: 1;
    border-bottom: 1px solid ${props => props.theme.darkgrey};
    display: flex;
    align-items: center;

    .navbar-header {
      height: 100%; 
      margin-left: 20px;
      color: ${props => props.theme.darkgrey};

      h1 {
        font-family: 'Sedgwick Ave Display';
        font-size: 6rem;
      }
    }

    ul {
      position: absolute;
      margin: 0;
      padding: 0;
      overflow: hidden;
      top: 0px;
      right: 0px;
      list-style: none;
      display: flex;
      align-items: center;

      li {
        float: left;
        font-size: 2rem;

        img {
          width: 20rem;
        }
      } 
    }
  }
`
export default Navbar

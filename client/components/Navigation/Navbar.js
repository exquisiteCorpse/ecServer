import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Navbar = styled.section`
  {
    position: fixed;
    height: 60px;
    width: 100%;
    background-color: ${props => props.theme.green};
    z-index: 1;
    border-bottom: 1px solid ${props => props.theme.green};
    display: flex;
    align-items: center;

    ul {
      position: absolute;
      margin: 0;
      padding: 0;
      overflow: hidden;
      top: 0px;
      right: 0px;
      list-style: none;

      li {
        height: 60px;
        float: left;

        a {
          height: 100%;
          width: auto;
          display: block;
          color: ${props => props.theme.white};
          text-align: center;
          text-decoration: none;
          padding: 20px;

          &:hover, &:focus {
            background: ${props => props.theme.greenhover};
            color: ${props => props.theme.darkgrey};  
          }

          .active {
            background: ${props => props.theme.greenhover};
            color: ${props => props.theme.darkgrey};  
          }
        } 
      } 
    }
  }
`
export default Navbar

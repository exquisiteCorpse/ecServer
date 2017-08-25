import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Corpse = styled.section`
  {
    background: ${props => props.theme.white};
    color: ${props => props.theme.darkgrey};
    
    text-align: center;
    z-index: 2;

    .corpse-header {
      background: ${props => props.theme.white};
      margin: 0;
      height: 60px;
      color: ${props => props.theme.darkgrey};
      font-size: 2rem;
      padding-top: 1.5rem;
      

      h1 {
        font-weight: normal;
        display: flex;
        padding: 16px;
        margin: 0;
      }
    }

    .corpse-image {
      padding: 10px;
      background: ${props => props.theme.lightgrey};
      border: 1px solid ${props => props.theme.lightgrey};
    }

    .corpse-overlay {
      position: absolute;
      top: 0;
      left: 0;
      background: none;
      width: 100%;
      height: 100%;
      z-index: 2;

      &:hover, &:focus {
        background: ${props => props.theme.darkgreyhover};
      }
    }

    .corpse-info {
      margin: 0;
      color: ${props => props.theme.lightgrey};

      h3 {
        font-weight: normal;
        display: flex;
        padding: 16px;
        margin: 0;
      }
    }
  }
`
export default Corpse

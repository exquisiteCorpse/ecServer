import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Corpse = styled.section`
  {
    background: ${props => props.theme.white};
    color: ${props => props.theme.darkgrey};
    border: 1px solid ${props => props.theme.darkgrey};
    text-align: center;
    z-index: 2;

    .corpse-header {
      background: ${props => props.theme.white};
      margin: 0;
      height: 60px;
      color: ${props => props.theme.darkgrey};
      font-size: 2rem;
      font-weight: bold;
      padding-top: 1.5rem;
      border-bottom: 1px solid ${props => props.theme.darkgrey};

      h1 {
        font-weight: normal;
        display: flex;
        padding: 16px;
        margin: 0;
      }
    }

    .corpse-image {
      margin: 10px;
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

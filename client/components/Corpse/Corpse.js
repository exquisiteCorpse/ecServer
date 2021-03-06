import React from 'react'
import styled from 'styled-components'

const Corpse = styled.section`
  {
    background: ${props => props.theme.white};
    color: ${props => props.theme.darkgrey};

    .corpse-header {
      background: ${props => props.theme.white};
      margin: 0;
      height: 20px;
      color: ${props => props.theme.darkgrey};
      text-align: left;
      padding-left: 20px;
      margin-bottom: 5px;

      h4 {
        font-size: 1.75rem;
        margin: 0;
      }
    }

    .image-container {
      position: relative;
      width: 100%;
    }

    .corpse-image {
      display: block;
      width: 100%;
      height: auto;
      padding: 10px;
      background: ${props => props.theme.white};
      border: 1px solid ${props => props.theme.medgrey};
    }

    .corpse-overlay {
      position: absolute;
      background: ${props => props.theme.color};
      border: 1px solid ${props => props.theme.darkgrey};
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      transition: .5s ease;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .image-container:hover .corpse-overlay {
      opacity: 0.7;
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

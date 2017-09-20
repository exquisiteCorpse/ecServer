import React from 'react'
import styled from 'styled-components'

const Navbar = styled.section`
  {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 80px;
    width: 100%;
    background-color: ${props => props.theme.white};
    z-index: 3;
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

    .navbar-message {
      height: 100%;
    }

    ul {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
      list-style: none;
      display: flex;
      align-items: center;

      li {
        font-size: 2rem;

        .git {
          width: 7rem;
        }
        .tube {
          width: 12rem;
        }

        img {
          padding-right: 20px;
          padding-top: 15px;

        }

      }
    }

    @media only screen and (max-width: 768px) {
      .navbar-header {
        margin: 0 auto;

        h1 {
          font-size: 4.5rem;
          text-align: center;
        }
      }

      .navbar-message {
        display: none;
      }
    }
  }
`
export default Navbar

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import { Row, Column } from './Grid/Grid'
import Navbar from './Navigation/Navbar'
import Header from './Header/Header'
import CorpseList from './Corpse/CorpseList'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  render () {
    // const {children, handleClick, isLoggedIn} = this.props
    return (
      <div>
        <Row>
          <Navbar>
            <Column xs='12' lg='6'>
              <div className='navbar-header'>
                <h1>Exquisite Corpse</h1>
              </div>
            </Column>
            <Column xs='12' lg='6'>
              <div className='navbar-message'>
                <ul>
                  <a href='https://www.youtube.com/watch?v=ndrjeA0yxAU'>
                    <li><img className='tube' src='images/yt_logo.png' /></li>
                  </a>
                  <a href='https://github.com/exquisiteCorpse'>
                    <li><img className='git' src='images/github-512.png' /></li>
                  </a>
                </ul>
              </div>
            </Column>
          </Navbar>
        </Row>
        <Row>
          <Header>
            <Column xs='12' lg='12' className='header-message'>
              <h3>Explore the Surrealist in you! Take a photo, and send it to a friend... let's see what you make together.</h3>
            </Column>
          </Header>
        </Row>
        <Row>
          <CorpseList />
        </Row>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

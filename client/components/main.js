import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navigation/Navbar'
import Header from './Header/Header'
import CorpseList from './Corpse/CorpseList'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export class Main extends Component {
  render () {
    // const {children, handleClick, isLoggedIn} = this.props
    return (
      <div id='main'>
        <Navbar>
          <div className='navbar-header'>
            <h1>Exquisite Corpse</h1>
          </div>
          <div>
            <ul className='navbar-message'>
              <li>Download in the Google Play store.</li>
              <li><img src='images/googleplay.png' /></li>
            </ul>
          </div>
        </Navbar>
        <Header>
          <div className='header-message'>
            <h3>Explore the Surrealist in you! Take a photo, and send it to a friend... let's see what you make together.</h3>
          </div>
        </Header>
        <div className='container-fluid gallery'>
          <div className='row text-center'>
            <CorpseList />
          </div>
        </div>
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

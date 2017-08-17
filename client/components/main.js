import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import FacebookLogin from 'react-facebook-login'
import { facebook } from '../../secrets'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export class Main extends Component {

  responseFacebook (response) {
    console.log(response)
  }
  render () {

    const { children, handleClick, isLoggedIn } = this.props
    const facebookcli = facebook.clientID
    return (
      <div>
        <h1>Exquisite Corpse</h1>
        <nav>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <FacebookLogin
                  appId={facebookcli}
                  autoLoad={true}
                  fields="name,email,picture"
                  scope="public_profile,user_friends,user_actions.books"
                  callback={this.responseFacebook}
                />
              </div>
          }
        </nav>
        <hr />
        {children}
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
    handleClick() {
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

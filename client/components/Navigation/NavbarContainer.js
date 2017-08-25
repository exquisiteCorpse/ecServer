// NOT IN USE UNTIL WE NEED FOR LOGIN

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
// import {logout} from '../../store'
// import Navbar from './Navbar'

// /* -----------------    COMPONENT     ------------------ */

// class NavbarContainer extends Component {
//   constructor (props) {
//     super(props)
//     this.renderLoggedIn = this.renderLoggedIn.bind(this)
//     this.renderLoggedOut = this.renderLoggedOut.bind(this)
//   }

//   render () {
//     const {isLoggedIn} = this.props

//     return (
//       <Navbar>
//         {
//           isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()
//         }
//       </Navbar>
//     )
//   }

//   renderLoggedIn () {
//     return (
//       <div>
//         <h1>{this.props.currentUser.username}</h1>

//         <ul>
//           <li>
//             <NavLink to='/home' activeClassName='active'>Home</NavLink>
//           </li>
//           <li>
//             <NavLink to='/login' onClick={this.props.handleClick} activeClassName='active'>Logout</NavLink>
//           </li>
//         </ul>
//       </div>
//     )
//   }

//   renderLoggedOut () {
//     return (
//       <div>
//         <ul>
//           <li>
//             <NavLink to='/signup' activeClassName='active'>Signup</NavLink>
//           </li>
//           <li>
//             <NavLink to='/login' activeClassName='active'>Login</NavLink>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// }

// /* -----------------    CONTAINER     ------------------ */

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.currentUser.id,
//     currentUser: state.currentUser
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick () {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(NavbarContainer)

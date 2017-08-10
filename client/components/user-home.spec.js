import {expect} from 'chai'
import React from 'react'
import {mapState, UserHome} from './user-home'
import {shallow} from 'enzyme'

describe('the user home file', () => {
  describe('mapStateToProps', () => {

    const email = 'cody@email.com'
    const fakeState = {user: {email}}

    it('returns the email from the user on state', () => {
      expect(mapState(fakeState).email).to.be.equal(email)
    })
  })

  describe('UserHome component', () => {
    let userHomeComponent

    const email = 'cody@email.com'

    beforeEach(() => {
      userHomeComponent = shallow(<UserHome email={email} />)
    })

    it('renders an email appropriately in an h3', () => {
      expect(userHomeComponent.find('h3').text()).to.be.equal('Welcome, cody@email.com')
    })

  })
})



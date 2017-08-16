import {expect} from 'chai'
import React from 'react'
import {AuthForm} from './auth-form'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

describe('show how to simulate an event', () => {

  let authFormComponent

  const fakeProps = {
    name: 'login',
    displayName: 'Login',
    handleSubmit: spy()
  }

  beforeEach(() => {
    authFormComponent = shallow(<AuthForm {...fakeProps} />)
  })

  it('invokes handleSubmit on submit', () => {

    authFormComponent.find('form').simulate('submit')
    expect(fakeProps.handleSubmit.calledOnce).to.be.equal(true)

  })
})

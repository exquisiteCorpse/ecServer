import {expect} from 'chai'
import {me, GET_USER} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const mockAxios = new MockAdapter(axios)
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store

  const initialState = {user: {}}

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET_USER action', () => {
      const fakeUser = {email: 'cody@email.com'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(me())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_USER)
          expect(actions[0].user).to.be.deep.equal(fakeUser)
        })
    })
  })
})

import axios from 'axios'

const initialState = []

export const INITIALIZE = 'INITIALIZE_CORPSES'
const GET = 'GET_CORPSE'

const init = corpses => ({type: INITIALIZE, corpses})
const get = corpse => ({type: GET, corpse})

export default function reducer (corpses = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return action.corpses
    case GET:
      return action.corpse
    default:
      return corpses
  }
}

export const fetchCorpses = () => dispatch => {
  axios.get(`/api/corpses`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error(`Fetching corpses unsuccessful`, err))
}

export const fetchCorpse = (id) => dispatch => {
  axios.get(`/api/corpse/${id}`)
    .then(res => dispatch(get(res.data)))
    .catch(err => console.error(`Fetching corpse id ${id} unsuccessful`, err))
}

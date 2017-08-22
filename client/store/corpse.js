import axios from 'axios'

const initialState = []

export const INITIALIZE = 'INITIALIZE_CORPSES'

const init = corpses => ({type: INITIALIZE, corpses})

export default function reducer(corpses = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return action.corpses
    default:
      return corpses
  }
}

export const fetchCorpses = () => dispatch => {
  axios.get(`/api/corpses`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error(`Fetching corpses unsuccessful`, err))

}

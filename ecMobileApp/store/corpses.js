
/* -----------------    IMPORTS     ------------------ */
import { apiUrl } from './url'
import axios from 'axios'

/* -----------------    ACTION TYPES     ------------------ */

const GET_CORPSES = 'GET_CORPSES'

/* ------------   ACTION CREATORS     ------------------ */

const getCorpes = (corpses) => {
  return { type: GET_CORPSES, corpses }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchCorpes = () =>
  dispatch =>
    axios.get(`${apiUrl}/corpses/display`)
      .then(res =>
        dispatch(getCorpes(res.data)))
      .catch(err => console.log(err))

/* ------------       REDUCERS     ------------------ */

export default function (state = [], action) {
  switch (action.type) {
    case GET_CORPSES:
      return action.corpses
    default:
      return state
  }
}

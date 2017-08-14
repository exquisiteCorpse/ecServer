
/* -----------------    IMPORTS     ------------------ */

import axios from 'axios'

/* -----------------    ACTION TYPES     ------------------ */

const GET_PHOTO = 'GET_PHOTO'

/* ------------   ACTION CREATORS     ------------------ */

export const getPhoto = (photo) => {
  return { type: GET_PHOTO, photo }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchPhotoData = () => {
  return dispatch => {
  }
}

/* ------------       REDUCERS     ------------------ */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PHOTO:
      return action.photo
    default:
      return state
  }
}

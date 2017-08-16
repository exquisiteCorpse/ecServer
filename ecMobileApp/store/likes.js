
/* -----------------    IMPORTS     ------------------ */
import { apiUrl } from './url'
import axios from 'axios'

/* -----------------    ACTION TYPES     ------------------ */

const GET_LIKES = 'GET_LIKES'
const POST_LIKES = 'POST_LIKES'
const DROP_LIKES = 'DROP_LIKES'

/* ------------   ACTION CREATORS     ------------------ */

const getLikes = (likes) => {
  return { type: GET_LIKES, likes }
}

const postLike = (like) => {
  return { type: POST_LIKES, like }
}

const dropLike = (like) => {
  return { type: DROP_LIKES, like }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchLikes = () =>
  dispatch =>
    axios.get(`${apiUrl}/likes`)
      .then(res =>
        dispatch(getLikes(res.data)))
      .catch(err => console.log(err))

export const postNewLike = (like) =>
  dispatch =>
    axios.post(`${apiUrl}/likes`, like)
      .then((res) => {
        dispatch(postLike(res.data))
      })
      .catch(err => console.log(err))

export const destroyLike = (like) =>
  dispatch =>
    axios.delete(`${apiUrl}/likes/${like.userId}/${like.corpseId}`)
      .then((res) =>
        dispatch(dropLike(like)))
      .catch(err => console.log(err))

/* ------------       REDUCERS     ------------------ */

export default function (state = [], action) {
  switch (action.type) {
    case GET_LIKES:
      return action.likes
    case POST_LIKES:
      return state.concat(action.like)
    case DROP_LIKES:
      return state.filter((like) => {
        if (!(like.userId === action.like.userId && like.corpseId === action.like.corpseId)) {
          return like
        }
      })
    default:
      return state
  }
}

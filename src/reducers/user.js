import {
  SET_USERNAME_REQUEST,
  SET_USERNAME_SUCCESS,
  SET_USERNAME_FAIL,
} from 'actions/userActions';

const storageChat = localStorage.getItem('chat_data');

const initialState = {
  user: {
    username: storageChat === undefined || storageChat === null
      ? null : JSON.parse(storageChat).username,
    color: storageChat === undefined || storageChat === null
      ? null : JSON.parse(storageChat).color,
    hash: storageChat === undefined || storageChat === null
      ? null : JSON.parse(storageChat).hash,
  },
  error: '',
  isLoading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME_REQUEST:
      return { ...state, isLoading: true, error: '' }

    case SET_USERNAME_SUCCESS:
      return { ...state, isLoading: false, user: action.payload }

    case SET_USERNAME_FAIL:
      return { ...state, isLoading: false, error: action.payload.message }

    default:
      return state
  }
}

export default userReducer;
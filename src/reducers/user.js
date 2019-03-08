import {
    SET_USERNAME_REQUEST,
    SET_USERNAME_SUCCESS,
    SET_USERNAME_FAIL,
  } from 'actions/userActions';
  
  const initialState = {
    username: '',
    error: '',
    isLoading: false,
  }

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USERNAME_REQUEST:
        return { ...state, isLoading: true, error: '' }
  
      case SET_USERNAME_SUCCESS:
        return { ...state, isLoading: false, username: action.payload.username }
  
      case SET_USERNAME_FAIL:
        return { ...state, isLoading: false, error: action.payload.message }
  
      default:
        return state
    }
  }

  export default userReducer;
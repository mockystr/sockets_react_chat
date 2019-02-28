export const SET_USERNAME_REQUEST = 'SET_USERNAME_REQUEST'
export const SET_USERNAME_SUCCESS = 'SET_USERNAME_SUCCESS'
export const SET_USERNAME_FAIL = 'SET_USERNAME_FAIL'

export const setUsername = (username, history) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USERNAME_REQUEST,
        })
        
        dispatch({
            type: SET_USERNAME_SUCCESS,
            payload: { username }
        })

        history.push('/chat');
    } catch (err) {
        console.log(err);

        dispatch({
            type: SET_USERNAME_FAIL,
            payload: { error: err }
        })
    }
}

export const SET_USERNAME_REQUEST = 'SET_USERNAME_REQUEST'
export const SET_USERNAME_SUCCESS = 'SET_USERNAME_SUCCESS'
export const SET_USERNAME_FAIL = 'SET_USERNAME_FAIL'

export const addUsername = (username, color, history) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USERNAME_REQUEST,
        })
        
        dispatch({
            type: SET_USERNAME_SUCCESS,
            payload: { username, color }
        });

        history.push('/chat');
    } catch (err) {
        console.log(err);

        dispatch({
            type: SET_USERNAME_FAIL,
            payload: { error: err }
        })
    }
}

export const setUsername = (username, color, socket) => async (dispatch) => {
    // console.log(username, color, 'from set username')
    
    socket.emit('message',
        {
            type: 'setUsername',
            payload: {
                userName: username,
                color: color
            }
        })
}
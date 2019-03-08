import {socket} from 'socket'

export const SET_USERNAME_REQUEST = 'SET_USERNAME_REQUEST'
export const SET_USERNAME_SUCCESS = 'SET_USERNAME_SUCCESS'
export const SET_USERNAME_FAIL = 'SET_USERNAME_FAIL'

export const setUsername = (username, history) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USERNAME_REQUEST,
        })

        setTimeout(() => {
            console.log('set username');
            socket.emit('message', 
            {
                type: 'setUsername',
                payload: {
                    userName: username
                }
            })

            dispatch({
                type: SET_USERNAME_SUCCESS,
                payload: { username }
            });
            
            history.push('/chat');
        }, 1000);
    } catch (err) {
        console.log(err);

        dispatch({
            type: SET_USERNAME_FAIL,
            payload: { error: err }
        })
    }
}

import bcrypt from 'bcryptjs';

export const SET_USERNAME_REQUEST = 'SET_USERNAME_REQUEST'
export const SET_USERNAME_SUCCESS = 'SET_USERNAME_SUCCESS'
export const SET_USERNAME_FAIL = 'SET_USERNAME_FAIL'

export const addUsername = (username, color, history) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USERNAME_REQUEST,
        })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(username, salt, function (err, hash) {
                console.log(hash);

                dispatch({
                    type: SET_USERNAME_SUCCESS,
                    payload: { username, color, hash }
                });
                history.push('/chat');
            });
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: SET_USERNAME_FAIL,
            payload: { error: err }
        })
    }
}

export const setUsername = (username, color, socket) => async (dispatch) => {
    socket.emit('message',
        {
            type: 'setUsername',
            payload: {
                userName: username,
                color: color
            }
        })
}
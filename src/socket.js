import { addMessageDirectly, addOnlineUsersDirectly } from 'actions/chatActions';
import { store } from 'store/configureStore';
import { setUsername } from 'actions/userActions';
import { push } from 'react-router-redux';
import { sendMessage } from 'actions/chatActions';
import { refreshUsername } from 'actions/userActions';


export const initSocket = (socket) => {
    socket.on('message', (data) => {
        console.log(data);
        // return (<Redirect push to='/haedawd' />)

        if (data.type === "userJoin" || data.type === "userLeft") {
            addOnlineUsersDirectly(data);
        }
        else {
            if (data.payload.error === true) {
                if (checkErrorUser(data.payload.hash)) {
                    addMessageDirectly(data);
                }
            }
            else if (data.payload.user === null) {
                console.log('re setusername');
                const chat_data = JSON.parse(localStorage.getItem('chat_data'));
                console.log('chat_data local storage', chat_data);

                refreshUsername(chat_data.username, chat_data.color, chat_data.hash);
                setUsername(chat_data.username, chat_data.color, socket);

                console.log('im sending again');
                sendMessage(chat_data.payload.message, chat_data.payload.hash, socket);
            }
            else addMessageDirectly(data);
        };
    });
}


export const checkErrorUser = hash => store.getState().user.user.hash === hash
import { addMessageDirectly, addOnlineUsersDirectly } from 'actions/chatActions';
import { store } from 'store/configureStore';
import { setUsernameDirectly } from 'actions/userActions';
import { sendMessage } from 'actions/chatActions';
import { refreshUsername } from 'actions/userActions';
import * as alertify from 'alertifyjs';


export const initSocket = (socket) => {
    socket.on('message', (data) => {
        console.log(data);

        if (data.type === "userJoin" || data.type === "userLeft") {
            addOnlineUsersDirectly(data);
        }
        else {
            if (data.payload.user === null) {
                const chat_data = JSON.parse(localStorage.getItem('chat_data'));
                refreshUsername(chat_data.username, chat_data.color, chat_data.hash);
                setUsernameDirectly(chat_data.username, chat_data.color, socket);

                if (data.payload.isFile === true) {
                    sendMessage({ fileHash: data.payload.fileHash }, data.payload.hash, socket);
                } else {
                    sendMessage({ message: data.payload.message }, data.payload.hash, socket);
                }
            }
            else if (data.payload.error === true) {
                if (checkErrorUser(data.payload.hash)) {
                    let message;
                    console.log('error in message:', data.payload.user.username)
                    
                    if (data.payload.message.length >= 10) {
                        message = `Failed to send message: ${data.payload.message.substring(0, 10)}...`;
                    } else {
                        message = `Failed to send message: ${data.payload.message}`;
                    }

                    alertify.notify(message, 'custom-error', 3, () => { });
                }
            }
            else addMessageDirectly(data);
        };
    });
}


export const checkErrorUser = hash => store.getState().user.user.hash === hash
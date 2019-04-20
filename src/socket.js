import { addMessageDirectly, addOnlineUsersDirectly } from 'actions/chatActions';
import { store } from 'store/configureStore';

export const initSocket = (socket) => {
    socket.on('message', (data) => {
        console.log(data);

        if (data.type === "userJoin" || data.type === "userLeft") {
            addOnlineUsersDirectly(data);
        }
        else {
            if (data.payload.error === true) {
                if (checkErrorUser(data.payload.hash)) {
                    addMessageDirectly(data);
                }
            }
            else addMessageDirectly(data);
        };
    });
}


export const checkErrorUser = hash => store.getState().user.user.hash === hash
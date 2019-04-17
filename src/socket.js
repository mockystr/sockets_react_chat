import { addMessageDirectly, addOnlineUsersDirectly } from 'actions/chatActions';

export const initSocket = (socket) => {
    socket.on('message', (data) => {
        if (data.type === "userJoin" || data.type === "userLeft") {
            addOnlineUsersDirectly(data);
        }
        else addMessageDirectly(data);
    });
}
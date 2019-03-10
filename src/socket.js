import { addMessageDirectly } from 'actions/chatActions';

export const initSocket = (socket) => {
    socket.on('message', (data) => {
        console.log(data);
        console.log(socket);

        addMessageDirectly(data);
    });
}
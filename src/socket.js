import io from 'socket.io-client';
import { addMessageDirectly } from 'actions/chatActions';

export const socket = io('http://185.87.51.125:3001', {
    path: '/ws',
    // transports: ['websocket', 'polling'],
});


export const initSocket = () => {
    socket.on('message', (data) => {
        console.log(data);

        addMessageDirectly(data);
    });
}
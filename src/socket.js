import { addMessageDirectly,addOnlineUsersDirectly } from 'actions/chatActions';

export const initSocket = (socket) => {
    socket.on('message', (data) => {
        // console.log(data.payload);
        // console.log(socket);
        console.log("slcasc",data)
        if (data.type === "userJoin" || data.type==="userLeft"){
            addOnlineUsersDirectly(data);

        }
        addMessageDirectly(data);
        
    });
}
import React from 'react'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom';
import 'containers/Chat/Chat.css';
import { initSocket } from 'socket';
import { sendMessage, addMessage } from 'actions/chatActions';
import { setUsername } from 'actions/userActions';
import { Dropdown,Divider, Button } from 'react-materialize';
import io from 'socket.io-client';
// import logo from './network.svg'

class Chat extends React.Component {
    socket = io('http://185.87.51.125:3001', {
        path: '/ws',
        // transports: ['websocket', 'polling'],
    });

    constructor(props) {
        super(props);

        const { user } = this.props;
        initSocket(this.socket);

        if (user.user.username.length === 0) {
            this.props.history.push('/');
        } else {
            const { setUsername } = this.props;
            setUsername(user.user.username, user.user.color, this.socket);
            
            localStorage.setItem('chat_data', JSON.stringify({
                username: user.user.username,
                color: user.user.color,
            }))
        }

        this.handleMessageBlockChange = this.handleMessageBlockChange.bind(this);
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleMessageBlockChange = (event) => {
        console.log('asd');
    }

    handleInputMessage = (event) => {
        if (event.key === 'Enter' && event.target.value.length !== 0) {
            sendMessage(event.target.value, this.socket);

            const { addMessage, user } = this.props;

            addMessage({
                type: 'sendMessage',
                payload: {
                    user: {
                        userName: user.user.username,
                        color: user.user.color,
                    },
                    message: event.target.value
                }
            })

            event.target.value = '';
        }
    }

    render() {
        const { chat } = this.props;

        return (
            <div className='container'>
            <div className='userCounter'>
            <Dropdown trigger={<Button>{chat.onlineUsers.length} Users</Button>} options={{"coverTrigger":0}}>
                {chat.onlineUsers.map(user=> {
                    return(
                        <div key={Math.random() * 100000}>
                            <a href="#">{user.user.userName}</a>
                        </div>
                    )
                })}                
                </Dropdown>
            </div>                
                <div id='chat-block-id' className='chat-block'>
                    <div className='message-block'
                        onChange={this.handleMessageBlockChange}>
                        {chat.messages.map(el => {
                            console.log(el, 'el');
                            if (el.type === 'sendMessage') {
                                console.log(el.payload, 'el.payload')
                                return (
                                    <div key={Math.random() * 100000}>
                                        <span style={{ color: el.payload.user.color }}>
                                            {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                        </span>
                                        : {el.payload.message}
                                    </div>
                                )
                            }
                            else if (el.type === 'userJoin'){
                                // this.setState({Artem:1})
                                return (
                                    <div key={Math.random() * 100000}>
                                        <span className='userJoin'>
                                            {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                        </span> joined the chat
                                    </div>
                                )}
                            else if (el.type === 'userLeft')
                                return (
                                    <div key={Math.random() * 100000}>
                                        <span className='userLeft'>
                                            {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                        </span> left the chat
                                    </div>
                                )

                            return <div key={Math.random() * 100000}></div>
                        })}
                    </div>
                    <input autoFocus placeholder='message...'
                        id='message_input' className='input-block' type='text'
                        onKeyPress={this.handleInputMessage}
                    />
                </div>
            </div>
                    
        )
    }
}

const mapStateToProps = store => {
    return {
        chat: store.chat,
        user: store.user
    }
}

const mapDispatchToProps = {
    addMessage, setUsername
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat))

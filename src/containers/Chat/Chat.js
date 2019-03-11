import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'containers/Chat/Chat.css';
import { initSocket } from 'socket';
import { sendMessage, addMessage } from 'actions/chatActions';
import { setUsername } from 'actions/userActions';
import io from 'socket.io-client';


class Chat extends React.Component {
    socket = io('http://185.87.51.125:3001', {
        path: '/ws',
        // transports: ['websocket', 'polling'],
    });

    constructor(props) {
        super(props);

        const { user } = this.props;
        initSocket(this.socket);

        if (user.username.length === 0) {
            this.props.history.push('/');
        } else {
            const { setUsername } = this.props;

            setUsername(user.username, this.socket);
            localStorage.setItem('chat_data', JSON.stringify({
                username: user.username
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
                    userName: user.username,
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
                <div id='chat-block-id' className='chat-block'>
                    <div className='message-block'
                        onChange={this.handleMessageBlockChange}>
                        {chat.messages.map(el => {
                            if (el.type === 'sendMessage')
                                return (
                                    <div key={Math.random() * 1000}>
                                        {el.payload.userName ? el.payload.userName : "undefined"}
                                        : {el.payload.message}
                                    </div>
                                )
                            else if (el.type === 'userJoin')
                                return (
                                    <div>
                                        <span className='userJoin'>
                                            {el.payload.userName}
                                        </span> joined the chat
                                    </div>
                                )
                            else if (el.type === 'userLeft')
                                return (
                                    <div>
                                        <span className='userLeft'>
                                            {el.payload.userName}
                                        </span> left the chat
                                    </div>
                                )
                            return <div></div>
                        })}
                    </div>
                    <input placeholder='message...'
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

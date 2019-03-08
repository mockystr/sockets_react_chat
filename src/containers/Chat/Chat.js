import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import 'containers/Chat/Chat.css';
import { initSocket } from 'socket';
import { sendMessage, addMessage } from 'actions/chatActions';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        initSocket();
    }

    handleInputMessage = (event) => {
        if (event.key === 'Enter') {

            sendMessage(event.target.value);

            const { addMessage, user } = this.props;
            addMessage({
                type: 'sendMessage',
                payload: {
                    userName: user.username,
                    socketId: 'BNxrjnF4VtUl3f2rAAAD',
                    message: event.target.value
                }
            })
            event.target.value = '';
        }
    }

    render() {
        const { user } = this.props;

        if (user.username.length === 0) {
            return <Redirect to='/' />
        }

        const { chat } = this.props;

        return (
            <div className='container'>
                <div id='chat-block-id' className='chat-block'>
                    <div className='message-block'>
                        {chat.messages.map(el => {
                            return (
                                <div key={Math.random() * 1000
                                    // el.payload.socketId
                                    // Date.now()*2
                                }>
                                    {el.payload.userName ? el.payload.userName : "undefined"}
                                    : {el.payload.message}
                                </div>
                            )
                        })}
                    </div>
                    <input placeholder='your message...' id='message_input' className='input-block' type='text'
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
    addMessage
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat))

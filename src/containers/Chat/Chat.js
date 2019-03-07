import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
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

            const { addMessage } = this.props;
            // addMessage(event.target.value);

            addMessage({
                type: 'sendMessage',
                payload: {
                    socketId: 'BNxrjnF4VtUl3f2rAAAD',
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
                    <div>
                        {chat.messages.map(el => {
                            return (
                                <div key={el.payload.socketId}>
                                    {el.payload.username ? el.payload.username : "undefined"}
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
        chat: store.chat
    }
}

const mapDispatchToProps = {
    addMessage
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat))

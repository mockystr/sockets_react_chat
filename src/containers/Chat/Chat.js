import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import 'containers/Chat/Chat.css';
import { initSocket } from 'socket';
import { sendMessage, addMessage } from 'actions/chatActions';
import { setUsername } from 'actions/userActions';
import { Dropdown, Button } from 'react-materialize';
import io from 'socket.io-client';
import logo from './networking.svg'
import file_attach from './iconfinder_editor-attachment-paper-clip-2_763387.svg';
import SocketIOFileClient from 'socket.io-file-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import { staticFileUrl } from 'api';
import fetchDownload from 'fetch-download';

class Chat extends React.Component {
    socket = io('http://185.87.51.125:3001', {
        path: '/ws',
        // transports: ['websocket', 'polling'],
    });
    uploader = new SocketIOFileClient(this.socket, {
        // maxFileSize: 4194304,
    });

    constructor(props) {
        super(props);

        const { user } = this.props;
        initSocket(this.socket);

        this.uploader.on('start', function (fileInfo) {
            console.log('Start uploading', fileInfo);
        });

        this.uploader.on('stream', function (fileInfo) {
            console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
        });
        this.uploader.on('complete', function (fileInfo) {
            console.log('Upload Complete', fileInfo);
        });
        this.uploader.on('error', function (err) {
            console.log('Error!', err);
        });
        this.uploader.on('abort', function (fileInfo) {
            console.log('Aborted: ', fileInfo);
        });

        if (!user.user.username) {
            this.props.history.push('/');
        } else {
            const { setUsername } = this.props;
            setUsername(user.user.username, user.user.color, this.socket);

            localStorage.setItem('chat_data', JSON.stringify({
                username: user.user.username,
                color: user.user.color,
                hash: user.user.hash
            }))
        }

    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleInputMessage = (event) => {
        const { user } = this.props;

        if (event.key === 'Enter' && event.target.value.length !== 0) {
            sendMessage({ message: event.target.value }, user.user.hash, this.socket);
            event.target.value = '';
        }
    }

    handleFileChange = (event) => {
        event.preventDefault();

        const fileEl = event.target;
        console.log(this.uploader, 'uploader');
        this.uploader.upload(fileEl, { data: {} });

        event.target.value = '';
    }

    render() {
        const { chat } = this.props;
        const ROOT_CSS = css({
            height: 'inherit',
            width: 'inherit'
        });
        return (
            <div className='container'>
                <div className='userCounter' >
                    <Dropdown trigger={<Button style={{ "width": "80px" }}>
                        <img src={logo} alt="onlineUsers" style={{ height: "30px", float: "left" }} />
                        {chat.onlineUsers.length}
                    </Button>}
                        options={{ "coverTrigger": false, "alignment": 'left' }}>
                        {chat.onlineUsers.map(user => {
                            return (
                                <span key={Math.random() * 100000}>
                                    <Link to="#" style={{ color: user.user.color, textAlign: 'center' }}>{user.user.userName}</Link>
                                </span>
                            )
                        })}
                    </Dropdown>
                </div>
                <div id='chat-block-id' className='chat-block'>
                    <div className='message-block'>
                        <ScrollToBottom className={ROOT_CSS}>
                            {chat.messages.map(el => {
                                if (el.type === 'sendMessage') {
                                    if (el.payload.isFile === true) {
                                        const file_ext = el.payload.fileHash.split('.').pop();

                                        if (['jpeg', 'png', 'jpg'].includes(file_ext)) {
                                            return (
                                                <div key={Math.random() * 100000}>
                                                    <span style={{ color: el.payload.user.color }}>
                                                        {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                                    </span>
                                                    : <img src={staticFileUrl + el.payload.fileHash} alt='image_url_api'
                                                        style={{ 'width': '300px' }} />
                                                    ({Math.floor(el.payload.fileSize / 1024)} KB)
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={Math.random() * 100000}>
                                                <span style={{ color: el.payload.user.color }}>
                                                    {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                                </span>
                                                : <span style={{ 'cursor': 'pointer', 'color': 'blue' }}
                                                    onClick={(e) => fetchDownload(staticFileUrl + el.payload.fileHash)}>
                                                    {el.payload.fileHash}
                                                </span> ({Math.floor(el.payload.fileSize / 1024)} KB)
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={Math.random() * 100000}>
                                            <span style={{ color: el.payload.user.color }}>
                                                {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                            </span>
                                            : {el.payload.message}
                                        </div>
                                    )
                                }
                                else if (el.type === 'userJoin') {
                                    return (
                                        <div key={Math.random() * 100000}>
                                            <span className='userJoin'>
                                                {el.payload.user.userName ? el.payload.user.userName : "undefined"}
                                            </span> joined the chat
                                    </div>
                                    )
                                }
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
                        </ScrollToBottom>
                    </div>
                    <div className='message_file_block'>
                        <div className='file_attach'>
                            <label htmlFor="file_attach">
                                <img alt='attach' src={file_attach}
                                    style={{
                                        'cursor': 'pointer',
                                        width: "30px"
                                    }} />
                            </label>
                            <input type="file" id="file_attach" style={{ 'display': 'none' }}
                                onChange={this.handleFileChange} />
                        </div>
                        <div className='massage_input__block'>
                            <input autoFocus placeholder='message...'
                                id='message_input' className='input-block' type='text'
                                onKeyPress={this.handleInputMessage}
                            />
                        </div>
                    </div>
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

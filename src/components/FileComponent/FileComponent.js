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

class Chat extends React.Component {
    socket = io('http://185.87.51.125:3001', {
        path: '/ws',
        // transports: ['websocket', 'polling'],
    });
    uploader = new SocketIOFileClient(this.socket, {
        // uploadDir: '../../files',
        // accepts: ['image/png', 'text/html', 'image/jpeg', 'application/json', 'text/plain'], // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
        maxFileSize: 4194304, // 4 MB. default is undefined(no limit)
        // chunkSize: 10240, // default is 10240(1KB)
        // transmissionDelay: 0, // delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
        // overwrite: true // overwrite file if exists, default is true.
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

        if (user.user.username.length === 0) {
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
            sendMessage(event.target.value, user.user.hash, this.socket);
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
            <div></div>
        )
    }
}

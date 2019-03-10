import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'containers/Home/Home.css';
import { addUsername } from 'actions/userActions';
import Loader from 'react-loader-spinner'


class Home extends React.Component {
    state = {
        greetings: ['give me username, pls',
            'can you give me username?',
            'your username, sir.',
            'i need your username',
            'hi. username?'
        ]
    }

    componentWillMount() {
        const { greetings } = this.state
        const item = greetings[Math.floor(Math.random() * greetings.length)];

        this.setState({
            item,
            isLoading: this.props.user.isLoading
        })
    }

    handleInputOnKeyPressed = (event) => {
        if (event.key === 'Enter' && event.target.value.length >= 1) {
            console.log(event.target.value)
            const { addUsername } = this.props;

            this.setState({ inputUsernameValue: event.target.value })
            addUsername(event.target.value, this.props.history);
        }
    }

    render() {
        localStorage.clear();
        
        const { item } = this.state;
        const { user: { isLoading } } = this.props;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='username-block'>
                        <h2>{item}</h2>
                        <div className="input-field col s12 l8 m8 offset-l2 offset-m2">
                            <input placeholder="username..." id="first_name" type="text" className="validate"
                                onKeyPress={this.handleInputOnKeyPressed} />
                        </div>
                    </div>
                </div>
                {isLoading ?
                    <div className='row'>
                        <div className='col s12 l-6 m-9' style={{ 'textAlign': 'center' }}>
                            <Loader
                                type="Puff"
                                color="green"
                                height="50"
                                width="50"
                            />
                        </div>
                    </div>
                    : <div></div>}
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

const mapDispatchToProps = {
    addUsername
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))

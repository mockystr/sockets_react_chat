import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'containers/Home/Home.css';
import { setUsername } from 'actions/userActions';
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

    componentWillMount(props) {
        const { greetings } = this.state
        const item = greetings[Math.floor(Math.random() * greetings.length)];
        this.setState({ item, isLoading: this.props.user.isLoading })
    }

    handleInputOnKeyPressed = (event) => {
        if (event.key === 'Enter' && event.target.value.length >= 2) {
            console.log(event.target.value)
            const { setUsername } = this.props;

            this.setState({ inputUsernameValue: event.target.value})
            setUsername(event.target.value, this.props.history);
        }
    }

    render() {
        const { item } = this.state;
        const { user: { isLoading } } = this.props;
        console.log(isLoading)
        return (
                <div>
                    <div className='row'>
                        <div className='username-block'>
                            <h2>{item}</h2>
                            <div className="input-field col s6 offset-s3">
                                <input placeholder="type here..." id="first_name" type="text" className="validate"
                                    onKeyPress={this.handleInputOnKeyPressed} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {isLoading ? <Loader
                            type="Puff"
                            color="#00BFFF"
                            height="50"
                            width="50"
                        /> : <div>not loading</div>}
                        {/* <Loader
                            type="Puff"
                            color="#00BFFF"
                            height="50"
                            width="50"
                        /> */}
                    </div>
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
    setUsername
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))

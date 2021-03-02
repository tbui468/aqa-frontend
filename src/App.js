import React from 'react';
import TopNav from './TopNav';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class App extends React.Component {
    constructor () {
        super(); //must call super otherwise shit breaks
        //        this.SERVER_DOMAIN = 'https://intense-tundra-41777.herokuapp.com';
        this.SERVER_DOMAIN = 'http://localhost:3000';
        this.state = {
            message: ''
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount () {
        this.fetchData();
    }

    fetchData () {
        fetch(this.SERVER_DOMAIN, { mode: 'cors' })
            .then((res) => res.json())
            .then((res) => { //success
                console.log('success!');
                console.log(res);
                this.setState({ message: res.info });
            })
            .then(function (res) { //fail
                console.log('Failed!');
            });
    }

    render () {
        const { message } = this.state;
        return (
            <div>
                <TopNav />
                <h1>{message}</h1>
                <SignupForm title="Sign Up Now!" route={this.SERVER_DOMAIN + "/signup"} method="POST" />
                <LoginForm
                    title="Already registered?  Log in here."
                    route={this.SERVER_DOMAIN + "/login"}
                    method="POST"
                />
            </div>
        );
    }
}

export default App;

import React from 'react';

class Login extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { title, method, route } = this.props;
        return (
            <div>
                <h3>{title}</h3>
                <form action={route} method={method}>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        required
                        maxLength="30"
                    />
                    <br />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        required
                        minLength="5"
                        maxLength="30"
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;

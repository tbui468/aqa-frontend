import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ title, method, route }) => {
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
};

Login.propTypes = {
    title: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default Login;

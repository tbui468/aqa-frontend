import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BACKEND_DOMAIN } from './Globals';

const Signup = (props) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleUsernameChange = (e) => {
        setValues((values) => ({
            ...values,
            username: e.target.value
        }));
    };
    const handleEmailChange = (e) => {
        setValues((values) => ({
            ...values,
            email: e.target.value
        }));
    };
    const handlePasswordChange = (e) => {
        setValues((values) => ({
            ...values,
            password: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        fetch(BACKEND_DOMAIN + 'users', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((results) => {
            props.onSubmit();
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="name"
                    required
                    maxLength="30"
                    value={values.username}
                    onChange={handleUsernameChange}
                />
                <br />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    required
                    maxLength="30"
                    value={values.email}
                    onChange={handleEmailChange}
                />
                <br />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    required
                    minLength="5"
                    maxLength="30"
                    value={values.password}
                    onChange={handlePasswordChange}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

Signup.propTypes = {
    onSubmit: PropTypes.func
};

export default Signup;

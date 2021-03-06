import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import PropTypes from 'prop-types';

const Login = () => {
    const history = useHistory();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const handleUsernameChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            username: e.target.values
        }));
    };

    const handlePasswordChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            password: e.target.values
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        fetch("http://localhost:3000/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        }).then((results) => {
            history.push('/profile');
            window.location.reload(); //need this to update Navbar link (Login -> Profile)
        });
    };


    return (
        <div>
            <h3>Login</h3>
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
                    name="password"
                    placeholder="password"
                    required
                    minLength="5"
                    maxLength="30"
                    value={values.password}
                    onChange={handlePasswordChange}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


export default Login;

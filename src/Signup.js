import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';

//need to access db and create new user
//check out Login.js to see how I did forms before
//don't allow signup if email is already taken

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    //   const history = useHistory();

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

        fetch('http://localhost:3000/users', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((results) => {
            //            history.push('/login');
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

export default Signup;

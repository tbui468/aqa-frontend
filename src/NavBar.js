import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './navBar.css';
//one option: each time Navbar is created, check logged in status

const NavBar = (props) => {
    const history = useHistory();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });


    const handleUsernameChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            username: e.target.value
        }));
    };

    const handlePasswordChange = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            password: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((results) => {
            if(results.status === 200) {
               props.setLoggedIn(true);
            }
        }).catch((err) => {
            console.log('error');
        });
    };


    const logout = () => {
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then((results) => {
            props.setLoggedIn(false);
            history.push('/');
        });
    };

    return (
        <ul id="nav-container">
            <div id="nav-left">
                <li className="nav-item">
                    <Link to="/questions">Questions</Link>
                </li>
            </div>
            <div id="nav-right">
                {props.loggedIn ? (
                    <div>
                        <li className="nav-item">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={logout}>Log out</button>
                        </li>
                    </div>
                ) : (
                    <li className="nav-item">
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
                            <button type="submit">Login</button>
                        </form>
                    </li>
                )}
            </div>
        </ul>
    );
};

export default NavBar;


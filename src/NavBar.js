import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = (props) => {
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

    return (
        <ul id="nav-container">
            <div id="nav-left">
                <li className="nav-item">
                    <Link to="/questions">Questions</Link>
                </li>
            </div>
            <div id="nav-right">
                {props.user ? (
                    <div>
                        <li className="nav-item">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={props.logout}>Log out</button>
                        </li>
                    </div>
                ) : (
                    <li className="nav-item">
                        <form onSubmit={props.login}>
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


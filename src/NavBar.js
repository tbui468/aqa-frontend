import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <header className="primary-header container group">
            <h1 className="logo">
                <Link to="/questions">Questions</Link>
            </h1>
            <nav className="nav primary-nav">
                <ul>
                    {props.user ? (
                        <div>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={props.logout}>Log out</button>
                            </li>
                        </div>
                    ) : (
                        <li>
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
                </ul>
            </nav>
        </header>
    );
};

NavBar.propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
};

export default NavBar;


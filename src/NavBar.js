import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//one option: each time Navbar is created, check logged in status

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json();
            })
            .then((json) => {
                console.log(json);
                if (json.user_name !== undefined) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            });
    }, []);

    return (
        <ul>
            <li>
                <Link to="/questions">Questions</Link>
            </li>
            {loggedIn ? (
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            ) : (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )}
        </ul>
    );
};

export default NavBar;

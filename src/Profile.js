import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AccessDenied from './AccessDenied';

const Profile = () => {
    const [name, setName] = useState('name goes here');
    const [email, setEmail] = useState('email goes here');
    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory(); //use this to redirect to different route

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
            .then((result) => {
                return result.json(); //why is this this necessary? (Why can't it be combined with the next step?)
            })
            .then((user) => {
                if (user) {
                    setName(user.user_name);
                    setEmail(user.user_email);
                    setLoggedIn(true);
                }
            });

    }, []);

    const logout = () => {
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then((results) => {
            history.push('/');
            window.location.reload(); //need this to change NavBar link (profile -> login)
        });
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <h1>Profile page</h1>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <button onClick={logout}>Log out</button>
                </div>
            ) : (
                <AccessDenied />
            )}
        </div>
    );
};

export default Profile;

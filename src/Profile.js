import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Profile = () => {
    const [name, setName] = useState('name goes here');
    const [email, setEmail] = useState('email goes here');
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:3000/profile", {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then((result) => {
            return result.json();
        }).then((json) => {
            setName(json.user_name);
            setEmail(json.user_email);
        });
    }, []);

    const logout = () => {
    //send get request to api/logout, and then redirect to main page
        fetch("http://localhost:3000/logout", {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then((results) => {
            history.push('/');
            window.location.reload();
        });
    };

    return (
        <div>
            <h1>Profile page</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import Router from './Router';
import './index.css';
import { BACKEND_DOMAIN } from './Globals';


const App = () => {
    const [overlayClass, setOverlayClass] = useState('');
    const [user, setUser] = useState(null);

    const authenticateUser = () => {
        fetch(BACKEND_DOMAIN + 'users/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json(); //json() is an async call, so need .then to handle it (or use async)
            })
            .then((result) => {
                console.log(result[0].weights);
                if (result[0].user_name) {
                    setUser({
                        username: result[0].user_name,
                        email: result[0].user_email,
                        id: result[0].user_id,
                        weights: result[0].weights //array with objects with two keys (question_topic and count)
                    });
                } else {
                    setUser(null);
                }
            });
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    useEffect(() => {

    }, [user]);


    const login = (e) => {
        e.preventDefault();
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        fetch(BACKEND_DOMAIN + 'login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((results) => {
            if (results.status === 200) {
                authenticateUser();
                //successful login
            }
        }).catch((err) => {
            console.log('error');
        });
    };

    const logout = () => {
        fetch(BACKEND_DOMAIN + 'logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then((results) => {
            setUser(null);
            //            history.push('/');
        });
    };

    const toggleOverlay = () => {
        if (overlayClass === '') {
            setOverlayClass('overlay');
        } else {
            setOverlayClass('');
        }
    };

    return (
        <div>
            <div className={overlayClass} />
            <Router user={user} toggleOverlay={toggleOverlay} login={login} logout={logout} />
        </div>
    );
};

export default App;

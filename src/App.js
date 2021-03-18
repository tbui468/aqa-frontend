import React, { useState, useEffect } from 'react';
import Router from './Router';
import './index.css';
import './app.css';


const App = () => {
//    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [overlayClass, setOverlayClass] = useState('');
    const [user, setUser] = useState(null);

    const authenticateUser = () => {
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then((result) => {
                return result.json(); //why is this this necessary? (Why can't it be combined with the next step?)
            })
            .then((result) => {
                if (result.user_name) {
                    setUser({
                        username: result.user_name,
                        email: result.user_email
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

        fetch('http://localhost:3000/login', {
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
        fetch('http://localhost:3000/logout', {
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
            setOverlayClass('app-overlay');
        } else {
            setOverlayClass('');
        }
    };

    return (
        <div id="app-container">
            <div className={overlayClass} />
            <Router user={user} toggleOverlay={toggleOverlay} login={login} logout={logout} />
        </div>
    );
};

export default App;

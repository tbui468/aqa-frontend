import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import './router.css';

import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';


const Router = () => {
    const [classes, setClasses] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: ''
    });


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
                    setUser({
                        username: user.user_name,
                        email: user.user_email,
                    });
                }
            });
    }, [loggedIn]);


    const toggleFade = (e) => {
        if (classes === 'router-black-overlay') {
            setClasses('');
        } else {
            setClasses('router-black-overlay');
        }
    };

    return (
        <div id="router-container">
            <BrowserRouter>
                <div className={classes} />
                <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
                <Switch>
                    <Route exact path="/">
                        <Main toggleFade={toggleFade} />
                    </Route>
                    <Route exact path="/questions">
                        <QuestionIndex toggleFade={toggleFade} />
                    </Route>
                    <Route exact path="/questions/:question_id">
                        <QuestionDetail toggleFade={toggleFade} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile user={user} loggedIn={loggedIn} toggleFade={toggleFade} />
                    </Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Router;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import './router.css';

import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import QuestionForm from './QuestionForm'; //also serves as question edit
import AnswerForm from './AnswerForm'; //also serves as answer edit
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';


const Router = () => {
    const [ faded, setFaded ] = useState(false);
    const [ classes, setClasses ] = useState('');

    useEffect(() => {
        
    }, [faded]);

    const toggleFade = (e) => {
        if(faded) {
            setFaded(false);
            setClasses('not-faded');
        }else{ 
            setFaded(true);
            setClasses('faded');
        }
    };


    return (
        <BrowserRouter>
            <div className={classes}>
            </div>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Main toggleFade={toggleFade} />
                </Route>
                <Route exact path="/questions">
                    <QuestionIndex />
                </Route>
                <Route exact path="/questions/new" component={QuestionForm} />
                <Route exact path="/questions/:question_id" component={QuestionDetail} />
                <Route exact path="/questions/:question_id/answers/new" component={AnswerForm} />
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;

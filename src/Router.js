import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

import Main from './Main';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import QuestionForm from './QuestionForm'; //also serves as question edit
import AnswerForm from './AnswerForm'; //also serves as answer edit
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';

//state should be saved here if avoiding re-rendering/mounting of components is necessary

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
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

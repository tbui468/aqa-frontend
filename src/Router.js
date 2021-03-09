import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Main';
import Signup from './Signup';
import QuestionIndex from './QuestionIndex';
import QuestionDetail from './QuestionDetail';
import QuestionForm from './QuestionForm'; //also serves as question edit
import AnswerForm from './AnswerForm'; //also serves as answer edit
import Profile from './Profile';
import NavBar from './NavBar';

//when going to '/', if logged in redirect to /questions
//change a single state of the Router, which will trigger an update of all the children too....

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/signup">
                    <Signup
                        title="Signup here"
                        method="POST"
                        route={'http://localhost:3000/signup'}
                    />
                </Route>
                <Route exact path="/questions">
                    <QuestionIndex />
                </Route>
                <Route exact path="/questions/new" component={QuestionForm} />
                <Route exact path="/questions/:id" component={QuestionDetail} />
                <Route exact path="/questions/:question_id/answers/new" component={AnswerForm} />
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

import React from 'react';

//only accessible for logged in users (if logged in, a 'post question' button shows up in posts page)
//  put button on questions index page to allow user to post new question
//  will also need to check if user is logged in when accessing page for the first time
//      when checking, store user data (we need this when inserting question into database)
//      need: text and user id

const QuestionForm = () => {
    return (
        <h1>I'm a quesiton form</h1>
    );
};


export default QuestionForm;

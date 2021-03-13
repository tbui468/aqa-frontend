import React, { useState, useEffect } from 'react';

const AnswerForm = () => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //post to api
    };

    return (
        <form onSubmit={handleSubmit} >
            <textarea value={text} name="text" onChange={handleTextChange} required maxLength="280" placeholder="Type your answer here" />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AnswerForm;

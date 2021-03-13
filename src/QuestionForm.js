import React, { useState } from 'react';

const QuestionForm = (props) => {
    const [values, setValues] = useState({
        text: ''
    });

    const handleTextChange = (e) => {
        setValues((values) => ({
            ...values,
            text: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            text: e.target.text.value,
            topic: e.target.topic.value
        };

        fetch('http://localhost:3000/questions', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((results) => {
            props.onSubmit();
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="topic">
                    <option value="Business and Administration">Business and Administration</option>
                    <option value="Science and Engineering">Science and Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Medicine and Healthcare">Medicine and Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Law and Government">Law and Government</option>
                </select>
                <br />
                <textarea
                    name="text"
                    placeholder="Type your question here"
                    required
                    maxLength="280"
                    value={values.text}
                    onChange={handleTextChange}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default QuestionForm;

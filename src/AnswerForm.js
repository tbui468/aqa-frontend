import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AnswerForm = (props) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            text: e.target.text.value
        };

        props.onSubmit(data);
    };

    return (
        <section>
            <form onSubmit={handleSubmit} >
                <textarea
                    value={text}
                    name="text"
                    onChange={handleTextChange}
                    required
                    maxLength="280"
                    placeholder="Type your answer here" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

AnswerForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AnswerForm;

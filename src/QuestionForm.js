import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
            text: e.target.text.value
        };

        props.onSubmit(data);
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
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
        </section>
    );
};

QuestionForm.propTypes = {
    onSubmit: PropTypes.func
};

export default QuestionForm;

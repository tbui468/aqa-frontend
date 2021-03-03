import React from 'react';
import PropTypes from 'prop-types';

const QuestionSummary = ({ question, topAnswer, topAnswerPercent }) => {
    return (
        <div>
            <h4>{question}</h4>
            <p>{topAnswer}</p>
            <p>{topAnswerPercent}%</p>
        </div>
    );
};

QuestionSummary.propTypes = {
    question: PropTypes.string.isRequired,
    topAnswer: PropTypes.string,
    topAnswerPercent: PropTypes.string
};

export default QuestionSummary;

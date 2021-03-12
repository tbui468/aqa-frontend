import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuestionSummary = ({ id, question, topic, author, date }) => {
    return (
        <div>
            <Link to={'/questions/' + id}>{question}</Link>
            <p>{topic}</p>
            <p>{author}</p>
            <p>{date}%</p>
        </div>
    );
};

QuestionSummary.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    author: PropTypes.string,
    date: PropTypes.string
};

export default QuestionSummary;

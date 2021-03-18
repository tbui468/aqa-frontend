import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuestionSummary = ({ id, question, topic, date }) => {
    return (
        <div>
            <Link to={'/questions/' + id} dangerouslySetInnerHTML={{ __html: question }} />
            <p>{topic}</p>
            <p>{date}</p>
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

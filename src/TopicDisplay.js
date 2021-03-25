import React from 'react';
import PropTypes from 'prop-types';

const TopicDisplay = (props) => {
    return (
        <section>
            <h1>This is the weight display</h1>
            {props.user ? (
                <svg>
                    {props.user.weights.map((obj, i) => {
                        return (
                            <g>
                                <rect width={parseFloat(obj.count) + i * 10} y={i * 25} height="20"></rect>
                                <text x={parseFloat(obj.count) + 5} y={i * 25 + 9.5} dy=".35em">{obj.question_topic}</text>
                            </g>
                        );
                    })}
                </svg>
            ) : (
                <h3>hi</h3>
            )}
        </section>
    );
};

TopicDisplay.propTypes = {
    user: PropTypes.object
};

export default TopicDisplay;


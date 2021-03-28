import React from 'react';
import PropTypes from 'prop-types';

const TopicDisplay = (props) => {
    const classNames = [
        "bar-color-SaC",
        "bar-color-SaM",
        "bar-color-H",
        "bar-color-EaR",
        "bar-color-CaI",
        "bar-color-S",
        "bar-color-BaF",
        "bar-color-EaM",
        "bar-color-FaR",
        "bar-color-PaG"
    ]
    return (
        <section>
            <h1>User weights</h1>
            {props.user ? (
                <svg width="100%" height="300px">
                    {props.user.weights.map((obj, i) => {
                        return (
                            <g className={classNames[i] + " bar"} key={i}>
                                <rect width={parseFloat(obj.count)} y={i * 25} height="20"></rect>
                                <text x={parseFloat(obj.count) + 5} y={i * 25 + 9.5} dy=".35em">{obj.question_topic}</text>
                            </g>
                        );
                    })}
                </svg>
            ) : (
                <h3/>
            )}
        </section>
    );
};


TopicDisplay.propTypes = {
    user: PropTypes.object
};

export default TopicDisplay;



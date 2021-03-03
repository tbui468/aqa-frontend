import React, { useState, useEffect } from 'react';
import QuestionSummary from './QuestionSummary';

//use fetch and useEffect with [] as final parameter so that it's only called on mount
//display question and top answer and percent who voted for top answer (percent incorporates weight of each voters knowledge)
//if answer is over a certain length, use ellipses (...) to shorten
//should just fetch summary of each question (question, topAnswer, topAnswerPercent)

const Main = () => {
    const [questionSummaries, setQuestionSummaries] = useState([
        {
            question: "Are birds real?",
            topAnswer: "No, they're not",
            topAnswerPercent: "54.7"
        }
    ]);

    useEffect(() => {
        const s1 = {
            question: "Are birds real?",
            topAnswer: "No, they're not",
            topAnswerPercent: "54.7"
        };
        const s2 = {
            question: "What is a zebra?",
            topAnswer: "It's a striped horse",
            topAnswerPercent: "2.4"
        };
        setQuestionSummaries([s1, s2]);
    }, []); //empty update array so that fetch is only called on mount of component


    return (
        <ul>
            {questionSummaries.map((item, index) => {
                return (
                    <li key={index}>
                        <QuestionSummary
                            question={item.question}
                            topAnswer={item.topAnswer}
                            topAnswerPercent={item.topAnswerPercent}
                        />
                    </li>);
            })}
        </ul>
    );
};

export default Main;

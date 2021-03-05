import React, { useState, useEffect } from 'react';
import QuestionSummary from './QuestionSummary';

//use fetch and useEffect with [] as final parameter so that it's only called on mount
//display question and top answer and percent who voted for top answer (percent incorporates weight of each voters knowledge)
//if answer is over a certain length, use ellipses (...) to shorten
//should just fetch summary of each question (question, topAnswer, topAnswerPercent)

const QuestionIndex = () => {
    const [questionSummaries, setQuestionSummaries] = useState([
        {
            id: 0,
            question: "Are birds real?",
            author: '',
            date: ''
        }
    ]);

    useEffect(() => {
        fetch("http://localhost:3000/questions", {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then((result) => {
            return result.json();
        }).then((json) => {
            console.log(json);
            const arr = [];
            for (let i = 0; i < 3; i++) {
                const s = {
                    id: json[i].question_id,
                    question: json[i].question_text,
                    author: json[i].user_name,
                    date: json[i].question_date
                };
                arr.push(s);
            }
            setQuestionSummaries(arr);
        });
    }, []); //empty update array so that fetch is only called on mount of component


    return (
        <ul>
            {questionSummaries.map((item, index) => {
                return (
                    <li key={index}>
                        <QuestionSummary
                            id={item.id.toString()}
                            question={item.question}
                            author={item.author}
                            date={item.date}
                        />
                    </li>);
            })}
        </ul>
    );
};

export default QuestionIndex;

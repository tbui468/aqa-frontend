import React, { useState, useEffect } from 'react';
import QuestionSummary from './QuestionSummary';

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

import React, { useState, useEffect } from 'react';

const QuestionDetail = ({ match }) => {

    const [values, setValues] = useState({
        question: '',
        author: '',
        date: '',
        answers: [] //answers objects include answer, author, date (and later percent of votes)
    });

    useEffect(() => {
        fetch("http://localhost:3000/questions/" + match.params.id)
            .then((results) => {
                return results.json();
            }).then((json) => {
                //process array of answers here
                let arr = [];
                for(let i = 0; i < json.answer.length; i++) {
                    let obj = {
                        answer: json.answer[i].answer_text,
                        author: json.answer[i].user_name,
                        date: json.answer[i].answer_date
                    }
                    arr.push(obj);
                }
                setValues((values) => ({
                    question: json.question[0].question_text,
                    author: json.question[0].user_name,
                    date: json.question[0].question_date,
                    answers: arr
                }));
            });
    }, []);


    return (
        <div>
            <h1>Question Detail Page for item: {match.params.id}</h1>
            <h2>{values.question}</h2>
            <p>{values.author}</p>
            <p>{values.date}</p>
            <ul>
            {values.answers.map((item, index) => {
                return (<li key={index}>
                            <p>Answer: {item.answer}</p>
                            <p>by: {item.author}</p>
                            <p>date posted: {item.date}</p>
                         </li>);
            })}
            </ul>
        </div>
    );
};

export default QuestionDetail;

